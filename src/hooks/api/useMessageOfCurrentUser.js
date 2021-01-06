import { useState, useEffect } from 'react';
import firebase from '@helper/firebase';
import 'firebase/firestore';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function useMessageOfCurrentUser() {
  const { data: userData } = useCurrentUserData();
  const [currentId, setCurrentId] = useState('id');
  useEffect(() => {
    if (userData && userData.code === 200) {
      const currentUserId =
        userData && userData.code === 200 ? userData.user._id : 'id';
      setCurrentId(currentUserId);
    }
  }, [userData]);
  const firestore = firebase.firestore();
  const currentUserRef = firestore
    .collection('user')
    .doc(currentId)
    .collection(currentId);

  const currentUserQuery = currentUserRef.limit(25);

  const [currentUsers] = useCollectionData(currentUserQuery, { idField: 'id' });

  return currentUsers;
}

export default useMessageOfCurrentUser;
