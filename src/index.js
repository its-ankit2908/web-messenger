import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux'
import store from './store'

import { initializeApp } from "firebase/app";
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC-zQsq9hmGVXOC4N4jB6C7q4vXTuMn6bM",
    authDomain: "web-messenger-728c9.firebaseapp.com",
    projectId: "web-messenger-728c9",
    storageBucket: "web-messenger-728c9.appspot.com",
    messagingSenderId: "952097232779",
    appId: "1:952097232779:web:3258f98b40848f8c77c18e",
    measurementId: "G-X6YV3HM043"
  };

const firebaseApp  = initializeApp(firebaseConfig);  
 
window.store = store;

ReactDOM.render(
  <Provider store= {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


export {firebaseApp}