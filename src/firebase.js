// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = { //differnet for each project and author
  apiKey: "AIzaSyAqBsxOkMkh_Bzxrz5nLq-yuLFppAWvaTY",
  authDomain: "podcast-67f25.firebaseapp.com",
  projectId: "podcast-67f25",
  storageBucket: "podcast-67f25.appspot.com",
  messagingSenderId: "1082434628963",
  appId: "1:1082434628963:web:5c87e9724cf1f95ae03756",
  measurementId: "G-VL39HW3KPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); //store the database
const storage = getStorage(app); //storage bucket
const auth = getAuth(app); //authentication by firebase

export {auth,db,storage}