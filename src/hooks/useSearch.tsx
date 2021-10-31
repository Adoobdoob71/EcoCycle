import React, {useState} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function useSearch() {
  const [users, setUsers] = useState<FirebaseAuthTypes.User[]>([]);

  const searchUsers = async (value: string) => {
    setUsers([]);
    const data = await firestore()
      .collection('users')
      .orderBy('name')
      .startAt(value)
      .endAt(value + '\uf8ff')
      .get();
    data.docs.forEach(item =>
      setUsers(users => [...users, item.data() as FirebaseAuthTypes.User]),
    );
  };

  return {searchUsers, users};
}

export {useSearch};
