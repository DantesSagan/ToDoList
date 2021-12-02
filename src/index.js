import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import FirebaseContext from './context/firebaseContext';
import { firebaseLib, FieldValue } from './firebaseLibrary/firebaseLib';
import './style/tailwind.css';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebaseLib, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
