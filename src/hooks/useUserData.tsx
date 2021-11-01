import React, {FC, useState} from 'react';
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import {UserData} from '../utils/Types';

interface Props {
  uid: string;
}

function useUserData(uid: string) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const ref = doc(getFirestore(), 'users', uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setUserData(docSnap.data() as UserData);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {userData, loadData, loading, error};
}

export {useUserData};
