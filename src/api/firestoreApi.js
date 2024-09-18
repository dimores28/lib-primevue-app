import firebase from '../firebase';
const ft = firebase.firestore();

export async function loadRequests() {
   try {
      const snapshot = ft.collection('requests');
      const result = await snapshot.get();
      return result;
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function loadIntegrationsList() {
   try {
      const snapshot = ft.doc('/integrations/crm');
      const result = await snapshot.get();
      return result;
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function saveRequestToDB(params) {
   try {
      const newDocRef = ft.collection('requests').doc();
      const docId = newDocRef.id;
      const documentData = { id: docId };

      const returnedTarget = Object.assign(documentData, params);

      await newDocRef.set(returnedTarget);

      return returnedTarget;
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function updateRequestById(documentId, params) {
   try {
      const docRef = ft.collection('requests').doc(documentId);
      await docRef.update(params);
      return params;
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function loadDocumentById(documentId) {
   try {
      const snapshot = ft.collection('requests').doc(documentId);
      const result = await snapshot.get();
      return result.data();
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function deleteRequestById(reqId) {
   try {
      await ft.collection('requests').doc(reqId).delete();
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function getLastRequestsByLocation(locationsList) {
   try {
      const lastLocation = await ft
         .collection(`requests`)
         .where('location.id', '==', locationsList[0].id)
         .get();

      const result = [];

      lastLocation.docs.forEach((item) => {
         result.push(item.data());
      });

      return result;
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function getRequestsByLocationId(locationsId) {
   try {
      const lastLocation = await ft
         .collection(`requests`)
         .where('location.id', '==', locationsId)
         .get();

      const result = [];

      lastLocation.docs.forEach((item) => {
         result.push(item.data());
      });

      return result;
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

//====================================================//
export async function saveEmailTempateBody(templateId, data) {
   try {
      await ft.doc(`/templates/email/data/${templateId}`).set(data);
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function saveUsEmailTemplateBody(data) {
   try {
      // Перевірка, чи існує шаблон з таким самим ім'ям
      const querySnapshot = await ft
         .collection('/templates/email/data')
         .where('title', '==', data.title)
         .get();

      if (!querySnapshot.empty) {
         // Шаблон з таким ім'ям вже існує
         return '';
      } else {
         // Створення пустого документа, щоб отримати його ID
         const docRef = ft.collection('/templates/email/data').doc();
         data.id = docRef.id; // Присвоєння ID шаблону

         // Збереження даних у документ
         await docRef.set(data);

         // Повернення ідентифікатора нового документа
         return docRef.id;
      }
   } catch (error) {
      console.error('Error saving template:', error);
      throw error;
   }
}

export async function fetchEmailTemplate(location) {
   try {
      const snap = await ft.doc(`/templates/email/data/${location}`).get();

      const data = snap.data();
      if (!data) {
         return null;
      }
      return data;
   } catch (error) {
      console.error('Error fetching email template:', error);
      return null;
   }
}

export async function deleteEmailTemplate(templateId) {
   try {
      await ft.doc(`/templates/email/data/${templateId}`).delete();
      console.log('Template successfully deleted');
      return true;
   } catch (error) {
      console.error('Error deleting template:', error);
      return false;
   }
}

export async function fetchAllTemplates() {
   try {
      const snap = await ft.collection(`/templates/email/data`).get();

      const templates = [];
      snap?.forEach((doc) => {
         templates.push(doc.data());
      });

      return templates;
   } catch (error) {
      console.error('Error fetching email template:', error);
      return null;
   }
}

//====================================================//
export async function fetchApiTemplate(location) {
   try {
      const snap = await ft.doc(`/templates/api/data/${location}`).get();

      const data = snap.data();
      if (!data) {
         return null;
      }
      return data;
   } catch (error) {
      console.error('Error fetching email template:', error);
      return null;
   }
}

export async function saveApiTempateBody(templateId, data) {
   try {
      await ft.doc(`/templates/api/data/${templateId}`).set(data);
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

export async function deleteApiTemplate(templateId) {
   try {
      await ft.doc(`/templates/api/data/${templateId}`).delete();
      console.log('Template successfully deleted');
      return true;
   } catch (error) {
      console.error('Error deleting template:', error);
      return false;
   }
}

export async function saveUsApiTemplateBody(data) {
   try {
      // Перевірка, чи існує шаблон з таким самим ім'ям
      const querySnapshot = await ft
         .collection('/templates/api/data/')
         .where('title', '==', data.title)
         .get();

      if (!querySnapshot.empty) {
         // Шаблон з таким ім'ям вже існує
         return '';
      } else {
         // Створення пустого документа, щоб отримати його ID
         const docRef = ft.collection('/templates/api/data/').doc();
         data.id = docRef.id; // Присвоєння ID шаблону

         // Збереження даних у документ
         await docRef.set(data);

         // Повернення ідентифікатора нового документа
         return docRef.id;
      }
   } catch (error) {
      console.error('Error saving template:', error);
      throw error;
   }
}