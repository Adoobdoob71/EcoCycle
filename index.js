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
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Schema from './src/utils/model/Schema';
import Migrations from './src/utils/model/Migrations';
import {Friend, RecycleProgress} from './src/utils/model/Models';
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema: Schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations: Migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
export const watermelonDatabase = new Database({
  adapter,
  modelClasses: [RecycleProgress, Friend],
  actionsEnabled: true,
});

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
if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

GoogleSignin.configure({
  webClientId:
    '1051136066970-f93jk0uiv3hoke8a5h9n99u9qt657gcf.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
