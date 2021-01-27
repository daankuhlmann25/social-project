import firebase from "firebase";

// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
var config = ({
  apiKey: "AIzaSyDMVswMzlAHml-yKHlgFeldCzeoHpB2rrw",
  authDomain: "social-project-1dc19.firebaseapp.com",
  databaseURL: "https://social-project-1dc19.firebaseapp.com",
  projectId: "social-project-1dc19",
  storageBucket: "social-project-1dc19.appspot.com",
  messagingSenderId: "676020646893",
  appId: "1:676020646893:web:f37eaa681770fe56232de4"
});

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
export default db;