import firebase from '../firebase';
const db = firebase.database();

export async function loadLocations() {
   try {
      const snap = await db.ref('/locations').once('value');
      const locationData = snap.val();
      const locations = locationData ? Object.values(locationData) : [];
      const locationList = [];

      for (const doc of locations) {
         const location = {
            name: doc.name,
            id: doc.id
         };

         locationList.push(location);
      }

      return locationList;
   } catch (error) {
      console.error('Error loading requests:', error);
      throw error;
   }
}

async function fetchLocations() {
   try {
     const snapshot = await db.ref('locations').once('value');
     
     const list = [];
     snapshot.forEach(snap => {
       list.push(snap.val());
     });
 
     return list;
   } catch (error) {
     console.error('Error fetching locations:', error);
     return []; // Повертаємо пустий список у випадку помилки
   }
 }