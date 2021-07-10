import { User } from '@react-native-google-signin/google-signin';
import React from 'react';

const AuthContext = React.createContext({
  userInfo: null as User | null,
  updateUserInfo: (newUserInfo: User | null) => {}
});

export {AuthContext};