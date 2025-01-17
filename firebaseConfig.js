import { initializeApp } from 'firebase/app'; // Importer la fonction initializeApp
import { getFirestore } from 'firebase/firestore'; // Importer Firestore
import { getDatabase } from 'firebase/database'; // Importer Realtime Database

import Constants from 'expo-constants';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyArZVW0-D-QEBl1DOCq6suBLP-FAD0PwVM",
  authDomain: "beginfirebase-a611a.firebaseapp.com",
  projectId: "beginfirebase-a611a",
  storageBucket: "beginfirebase-a611a.appspot.com",
  messagingSenderId:"715355576335",
  appId:"1:715355576335:android:33e905089b58148160eb7a"
};

// Initialiser Firebase avec la configuration
const app = initializeApp(firebaseConfig);

// Exporter Firestore et Realtime Database pour les utiliser ailleurs
const db = getFirestore(app);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { firestore,app, db, database,auth};
