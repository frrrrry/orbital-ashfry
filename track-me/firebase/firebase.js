// Initialize Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";

// Configure Firebase.
export const firebaseConfig = {
    apiKey: "AIzaSyD2tMaCsuHN_zIgTCm1zkthrQJ561ku0Tg",
    authDomain: "ashfry-track-me.firebaseapp.com",
    projectId: "ashfry-track-me",
    storageBucket: "ashfry-track-me.appspot.com",
    messagingSenderId: "647668667303",
    appId: "1:647668667303:web:5c74eb41654b513a9ddc82",
    measurementId: "G-ECHC6DL7N8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//export const auth = firebase.auth();
//export const auth = getAuth(app);
export default app;
export const auth = getAuth(app);
export const storage = getStorage(app); 
export const db = getFirestore(app);