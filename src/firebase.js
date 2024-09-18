import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';


export function getConfig() {
  return {
    apiKey: "AIzaSyCFkwW_khFJVyuequ5ubFoWQ23fLTPOJ6Y",
    authDomain: "friendlychat-2e004.firebaseapp.com",
    databaseURL: "https://friendlychat-2e004.firebaseio.com",
    projectId: "friendlychat-2e004",
    storageBucket: "friendlychat-2e004.appspot.com",
    messagingSenderId: "535198689170",
    appId: "1:535198689170:web:c56de4b175aba4ec05034b",
    measurementId: "G-MB4ZBL3ZSK"
  }
}


 const firebaseConfig = getConfig();


export const projectID = `${firebaseConfig.projectId}`;
firebase.initializeApp(firebaseConfig);
export default firebase;