import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNRestart from 'react-native-restart/src';

function useAuth() {
  const [currentUser, setCurrentUser] =
    useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => setCurrentUser(user));
    return unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      RNRestart.Restart();
    } catch (error) {
      console.error(error);
    }
  };

  const signIntoAccount = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const newUserInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        newUserInfo.idToken,
      );
      const user = await auth().signInWithCredential(googleCredential);
      await signAccountDataIntoDB(user.user);
    } catch (error) {
      console.error(error);
    }
  };

  const signAccountDataIntoDB = async (newUser: FirebaseAuthTypes.User) => {
    try {
      const result = await firestore()
        .collection('users')
        .doc(newUser.uid)
        .get();
      if (result.exists)
        await firestore().collection('users').doc(newUser.uid).update({
          displayName: newUser.displayName,
          email: newUser.email,
          photoURL: newUser.photoURL,
        });
      else
        await firestore().collection('users').doc(newUser.uid).set({
          displayName: newUser.displayName,
          email: newUser.email,
          photoURL: newUser.photoURL,
          uid: newUser.uid,
        });
    } catch (error) {
      console.error(error);
    }
  };

  return {currentUser, signIntoAccount, signAccountDataIntoDB, signOut};
}

export {useAuth};
