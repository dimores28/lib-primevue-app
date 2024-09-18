<template>
   <div>
      <PrimeVueWrapper>
         <RequestsTable
            v-if="!preloader"
            :requests="requests"
            :initLocation="initLocation"
            :filtersDropDownListsObject="dropDownLists"
            @createRequest="createRequest"
            @changeLocationFilter="loadLocations($event)"
            @editRequest="Edit($event)"
            @deleteRequest="Delete($event)" />

         <Dialog
            v-model:visible="modalVisible"
            modal
            :key="dialogKey"
            class="beautiful-scroll"
            :header="!editMod ? 'Create request' : 'Edit request'"
            :style="{ width: '480px' }">
            <RequestsModal
               :editMod="editMod"
               :dropDownLists="dropDownLists"
               :preloader="preloader"
               :initialData="initialData"
               @clickCancelBtn="modalVisible = false"
               @saveRequest="saveRequest($event)"
               @updateRequest="updateRequest($event)"
               @editTemplate="editBodyTemplate($event)" />
         </Dialog>

         <Dialog
            v-model:visible="visibleTemplateModal"
            maximizable
            modal
            @hide="dialogKey++"
            header="Edit body template"
            :style="{ width: '80vw' }"
            :breakpoints="{ '1199px': '85vw', '575px': '90vw' }">
            <SelectedTemplate
               :templId="templateId"
               :emailMode="true"
               @save="saveChangeTemplate($event)"
               @saveUs="saveAsNewTemplate($event)" />
         </Dialog>
      </PrimeVueWrapper>
   </div>
</template>

<script>
import {
   PrimeVueWrapper,
   RequestsModal,
   Dialog,
   RequestsTable,
   SelectedTemplate,
} from 'requests_component_library';

import {
   loadIntegrationsList,
   saveRequestToDB,
   loadDocumentById,
   updateRequestById,
   deleteRequestById,
   getLastRequestsByLocation,
   getRequestsByLocationId,
   fetchAllTemplates
} from './api/firestoreApi';
import { loadLocations } from './api/databaseApi';

export default {
   components: {
      PrimeVueWrapper,
      RequestsModal,
      Dialog,
      RequestsTable,
      SelectedTemplate
   },
   data() {
      return {
         requests: [],
         modalVisible: false,
         editMod: false,
         documentId: '',
         dropDownLists: {},
         preloader: true,
         initialData: {},
         initLocation: {},
         username: '',
         visibleTemplateModal: false,
         templateId: '',
         dialogKey: 0,
      };
   },
   methods: {
      async Edit(event) {
         console.log('Edit: ', event);
         this.editMod = true;
         this.documentId = event.id;
         const res = await loadDocumentById(event.id);
         this.initialData = res;
         this.modalVisible = true;
      },
      Delete(doc) {
         console.log('Delete: ', doc);
         this.requests = this.requests.filter((item) => item.id != doc.id);
      },
      confirm(docId) {
         this.$confirm.require({
            message: 'Do you want to delete this reques?',
            header: 'Danger',
            icon: 'pi pi-info-circle',
            rejectProps: {
               label: 'Cancel',
               severity: 'secondary',
               outlined: true
            },
            acceptProps: {
               label: 'Delete',
               severity: 'danger'
            },
            accept: () => {
               deleteRequestById(docId);
               this.$toast.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Request deleted',
                  life: 3000
               });

               this.requests = this.requests.filter((item) => item.id != docId);
            },
            reject: () => {
               this.$toast.add({
                  severity: 'error',
                  summary: 'Rejected',
                  detail: 'You have rejected',
                  life: 3000
               });
            }
         });
      },
      createRequest() {
         this.editMod = false;
         this.modalVisible = true;
      },
      async saveRequest(event) {
         console.log('saveRequest: ', event);
         try {
            this.preloader = true;
            const docRef = await saveRequestToDB(event);
            console.log('Document successfully written with ID:', docRef);
            this.requests.push(this.parseRequestToTableRow(docRef));
            this.modalVisible = false;
            this.preloader = false;
         } catch (error) {
            console.error('Error adding document:', error);
         }
      },
      async updateRequest(event) {
         try {
            const res = await updateRequestById(event.id, event);
            this.modalVisible = false;

            const index = this.requests.findIndex(
               (request) => request.id === res.id
            );

            if (index !== -1) {
               console.log(res);
               this.requests[index] = this.parseRequestToTableRow(res);
            }
         } catch (error) {
            console.error('Error adding document:', error);
         }
      },
      async loadDropDawnData() {
         const integrations = await loadIntegrationsList();
         const integrationsData = integrations.data();
         this.dropDownLists.accountsList = integrationsData
            ? integrationsData?.accounts
            : [];
         this.dropDownLists.providersList = integrationsData
            ? integrationsData?.providers
            : [];

         const reqType = [
            { name: 'Email', value: 'email' },
            { name: 'API', value: 'api_reques' },
            { name: 'CRM', value: 'crm_reques' }
         ];
         this.dropDownLists.requesTypeList = reqType;
         this.dropDownLists.locationsList = await loadLocations();
         if (this.dropDownLists.locationsList.length) {
            this.initLocation = this.dropDownLists.locationsList[0];
         }

         const bodyTempDataArr = await fetchAllTemplates();

         this.dropDownLists.bodyTemplateList = bodyTempDataArr;

         this.dropDownLists.usecaseList = [{ name: 'CRM', value: 'CRM' }];
         this.preloader = false;
      },
      parseRequestToTableRow(req) {
         const row = {
            id: req?.id,
            usecase: req?.usecase?.name,
            title: req?.title,
            location: req?.location.name,
            requesType: req?.request_type?.name,
            account: req?.request_src?.account?.name,
            provider: req?.request_src?.provider?.name,
            bodyTemplate: req?.body_template?.title
         };

         return row;
      },
      async loadLocations(event) {
         console.log(event.value);

         if (event.value.id) {
            const newLocation = await getRequestsByLocationId(event.value.id);
            const updateTable = [];
            newLocation.forEach((item) => {
               updateTable.push(this.parseRequestToTableRow(item));
            });
            this.requests = updateTable;
         }
      },
      editBodyTemplate(event) {
         console.log('editBodyTemplate: ', event);

         this.templateId = event;
         this.visibleTemplateModal = true;
         // this.$router.push({
         //    name: 'body-template',
         //    params: {
         //       id: event,
         //       emeilMod: true
         //    }
         // });
      },
      saveChangeTemplate(event) {
         console.log(event);
         this.initialData.body_template = event;
      },
      saveAsNewTemplate(event) {
         console.log(event);
         this.initialData.body_template = event;
      },
   },
   async mounted() {
      await this.loadDropDawnData();

      const lastLocation = await getLastRequestsByLocation(
         this.dropDownLists.locationsList
      );

      const updateTable = [];
      lastLocation.forEach((item) => {
         updateTable.push(this.parseRequestToTableRow(item));
      });

      this.requests = updateTable;
   }
};
</script>

<style>
#app {
   margin: 0 auto;
   max-width: 1200px;
}
</style>
