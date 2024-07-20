// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLXZGI0IxCHOm_1FBP1CJ7MrAGlnLXubA",
  authDomain: "notionclone-5de50.firebaseapp.com",
  projectId: "notionclone-5de50",
  storageBucket: "notionclone-5de50.appspot.com",
  messagingSenderId: "714527398854",
  appId: "1:714527398854:web:bf63f9d69963e76b42b0c7",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
