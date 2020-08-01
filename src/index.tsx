import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import firebase from 'firebase/app';
import store from './redux/store';
import env from './env';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'firebase/auth';
import 'firebase/firestore';
import './assets/styles/main.scss';

firebase.initializeApp(env.firebase);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.register();
