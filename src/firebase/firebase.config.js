// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQKzVEI9_6Ji7-ETR4jso93yDhvPGD-CU",
  authDomain: "user-email-password-auth-b9d05.firebaseapp.com",
  projectId: "user-email-password-auth-b9d05",
  storageBucket: "user-email-password-auth-b9d05.appspot.com",
  messagingSenderId: "449861429157",
  appId: "1:449861429157:web:f4ac79d411e05c2a39aa4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;