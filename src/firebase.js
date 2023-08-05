// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-xMw42HNJZ9WFCpetSePX1Q3dayj5WDs",
    authDomain: "todo-vuetify-84221.firebaseapp.com",
    projectId: "todo-vuetify-84221",
    storageBucket: "todo-vuetify-84221.appspot.com",
    messagingSenderId: "360910990809",
    appId: "1:360910990809:web:d809e83f419bb7c2c23dc8",
    measurementId: "G-3XHJJGXR0H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true,
    merge: true
})
export default db;