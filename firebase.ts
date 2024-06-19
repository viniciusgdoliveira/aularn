// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArkI5hiWt-CfarY29yw202-wXiXKIS9HQ",
  authDomain: "aularn-a5827.firebaseapp.com",
  projectId: "aularn-a5827",
  storageBucket: "aularn-a5827.appspot.com",
  messagingSenderId: "787914779629",
  appId: "1:787914779629:web:b40777de663e5fff7d55e4",
  measurementId: "G-SN0BN52BPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };