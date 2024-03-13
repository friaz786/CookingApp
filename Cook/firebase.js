//import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// import { db } from './firebase';
//import "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtIOkEks8vuig6O3xx5foZ8mlbsZvp9ic",
  authDomain: "cookease-ebb67.firebaseapp.com",
  projectId: "cookease-ebb67",
  storageBucket: "cookease-ebb67.appspot.com",
  messagingSenderId: "146028790436",
  appId: "1:146028790436:web:fddaac0aa943bd92241c31",
  measurementId: "G-EWDST5JHRZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
 const db = getFirestore(app);
 //const db = firebase.firestore();
 const storage = getStorage(app);

export { auth, db, storage};


// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCtIOkEks8vuig6O3xx5foZ8mlbsZvp9ic",
//   authDomain: "cookease-ebb67.firebaseapp.com",
//   projectId: "cookease-ebb67",
//   storageBucket: "cookease-ebb67.appspot.com",
//   messagingSenderId: "146028790436",
//   appId: "1:146028790436:web:fddaac0aa943bd92241c31",
//   measurementId: "G-EWDST5JHRZ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// // Initialize Firebase Auth with AsyncStorage persistence
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// export { auth, db };

