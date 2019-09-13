import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const firebase = require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB2Ye8BWJiK0CW5UsLbzsepoHu-bZFyEcQ',
  authDomain: 'evernote-clone-c898a.firebaseapp.com',
  databaseURL: 'https://evernote-clone-c898a.firebaseio.com',
  projectId: 'evernote-clone-c898a',
  storageBucket: 'evernote-clone-c898a.appspot.com',
  messagingSenderId: '814513720596',
  appId: '1:814513720596:web:27e011ce4495a87a',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('evernote-container'));
