/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA13vOQ9K40Ic4qxD0H5ac_epCrZvDSHf8',
  authDomain: 'ecocycle-3ec15.firebaseapp.com',
  databaseURL:
    'https://ecocycle-3ec15-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ecocycle-3ec15',
  storageBucket: 'ecocycle-3ec15.appspot.com',
  messagingSenderId: '1051136066970',
  appId: '1:1051136066970:web:c8a4fe2c9624f64d9de623',
  measurementId: 'G-MH2VHPPS74',
};

firebase.initializeApp(firebaseConfig);

GoogleSignin.configure({
  webClientId:
    '1051136066970-f93jk0uiv3hoke8a5h9n99u9qt657gcf.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
