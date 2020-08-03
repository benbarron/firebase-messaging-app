import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { firebaseConfig } from './env';
import { NotificationProvider } from './context/notifcation-context';
import { NotificationFC } from './context/notification-component';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import App from './app';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import './assets/styles/main.scss';

firebase.initializeApp(firebaseConfig);
firebase.firestore();

ReactDOM.render(
  <Fragment>
    <BrowserRouter>
      <NotificationProvider>
        <Fragment>
          <NotificationFC />
          <App />
        </Fragment>
      </NotificationProvider>
    </BrowserRouter>
  </Fragment>,

  document.getElementById('root')
);

serviceWorker.register();
