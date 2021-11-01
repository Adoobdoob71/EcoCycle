import React, { createContext } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const AuthContext = createContext<{ currentUser: FirebaseAuthTypes.User | null;}>({
  currentUser: null
});

export {
  AuthContext
};