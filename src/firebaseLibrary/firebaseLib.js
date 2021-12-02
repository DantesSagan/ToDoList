// Import the functions you need from the SDKs you need
import * as Firebase from 'firebase/app';
import { Firestore } from '@firebase/firestore';
import 'firebase/firestore';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXwwKZ5i8z68GudIQssNTXLe5qiwlkgjw',
  authDomain: 'todolist-64991.firebaseapp.com',
  projectId: 'todolist-64991',
  storageBucket: 'todolist-64991.appspot.com',
  messagingSenderId: '829105661241',
  appId: '1:829105661241:web:02c3221b449d54177634e8',
};

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firestore;

export { firebase, FieldValue };
