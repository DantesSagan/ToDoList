import { createRoot } from 'react-dom/client';
import 'flowbite';

import React from 'react';
import App from './App';

import FirebaseContext from './context/firebaseContext';
import { firebaseLib, FieldValue } from './firebaseLibrary/firebaseLib';
import './style/tailwind.css';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <FirebaseContext.Provider value={{ firebaseLib, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
);
