// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAAyAmtyRAaUcdAeQGgzw14lwabsp5adkQ",
  authDomain: "reactchat-c301e.firebaseapp.com",
  projectId: "reactchat-c301e",
  storageBucket: "reactchat-c301e.appspot.com",
  messagingSenderId: "553012223643",
  appId: "1:553012223643:web:984bc5347a9ce7162df03e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {auth,db};