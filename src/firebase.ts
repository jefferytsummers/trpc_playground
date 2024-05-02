// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, TwitterAuthProvider, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3CEqM477kIKWXXTxqLeeVbgzPdwCFek8",
  authDomain: "save-the-date-a3011.firebaseapp.com",
  projectId: "save-the-date-a3011",
  storageBucket: "save-the-date-a3011.appspot.com",
  messagingSenderId: "626480767360",
  appId: "1:626480767360:web:b8c30449447eb72e28a165",
  measurementId: "G-J13YLZS0J6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { googleProvider, facebookProvider, twitterProvider, auth };

export default app;
