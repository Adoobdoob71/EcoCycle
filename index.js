/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '1051136066970-f93jk0uiv3hoke8a5h9n99u9qt657gcf.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
