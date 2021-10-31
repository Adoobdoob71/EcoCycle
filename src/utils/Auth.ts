import { User } from '@react-native-google-signin/google-signin';
import React from 'react';

const AuthContext = React.createContext<{ userInfo: User | null; updateUserInfo: (newUserInfo: User | null) => void; }>({
  userInfo: null,
  updateUserInfo: () => {}
});

export {AuthContext};