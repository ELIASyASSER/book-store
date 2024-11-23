// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgriG8zJccl_Q2DkQcHrqwlhHN4WFC6x0",
  authDomain: "bookstore-89005.firebaseapp.com",
  projectId: "bookstore-89005",
  storageBucket: "bookstore-89005.firebasestorage.app",
    messagingSenderId: "938475571433",
    appId: "1:938475571433:web:6f70aaa3355ec9df848878",
    measurementId: "G-Z36YY0GC44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)