import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';
import { firebaseConfig } from './env';
import * as serviceWorker from './serviceWorker';
import 'firebase/auth';
import 'firebase/firestore';
import './assets/styles/main.scss';

firebase.initializeApp(firebaseConfig);
firebase.firestore();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register();
