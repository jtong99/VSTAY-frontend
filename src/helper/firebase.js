import firebase from 'firebase/app';
import 'firebase/analytics';
const firebaseConfig = {
  apiKey: 'AIzaSyApinxGurRpcLEUMfC2gzuwyIuA3FQ2BkQ',
  authDomain: 'vstay-f8c57.firebaseapp.com',
  databaseURL: 'https://vstay-f8c57.firebaseio.com',
  projectId: 'vstay-f8c57',
  storageBucket: 'vstay-f8c57.appspot.com',
  messagingSenderId: '14195048071',
  appId: '1:14195048071:web:c8cc9aaa5a2da372650222',
  measurementId: 'G-L6V08Z04D3',
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  if (process.browser) {
    firebase.analytics();
  }
}

export default firebase;
