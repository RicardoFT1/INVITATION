// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2cmhKdVlw03b4NWMk2p1NQ_qaJ2e1g2U",
  authDomain: "invitaciones-bd623.firebaseapp.com",
  projectId: "invitaciones-bd623",
  storageBucket: "invitaciones-bd623.appspot.com",
  messagingSenderId: "512864803905",
  appId: "1:512864803905:web:83430b43ac94f7cc09fac0",
  measurementId: "G-ZCCKGRKHCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);