//import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { db } from './firebase';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCtIOkEks8vuig6O3xx5foZ8mlbsZvp9ic",
//   authDomain: "cookease-ebb67.firebaseapp.com",
//   projectId: "cookease-ebb67",
//   storageBucket: "cookease-ebb67.appspot.com",
//   messagingSenderId: "146028790436",
//   appId: "1:146028790436:web:fddaac0aa943bd92241c31",
//   measurementId: "G-EWDST5JHRZ",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAuGOnOXy1ZKd7Fu2SqJV7LWQJP39Kqopo",
  authDomain: "cookingapp-c084d.firebaseapp.com",
  projectId: "cookingapp-c084d",
  storageBucket: "cookingapp-c084d.appspot.com",
  messagingSenderId: "318206116404",
  appId: "1:318206116404:web:515c23eca3e280b7738061",
  measurementId: "G-WREK201TSW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
