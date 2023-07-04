// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyqQ_Bazc80fn9Z8d9xFohi4CMA_RhudU",
  authDomain: "medical-react-electron.firebaseapp.com",
  projectId: "medical-react-electron",
  storageBucket: "medical-react-electron.appspot.com",
  messagingSenderId: "103520422712",
  appId: "1:103520422712:web:aaf1b2a07f16d9b9e0cfcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
