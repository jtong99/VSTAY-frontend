import { useState, useEffect } from 'react';
import firebase from '@helper/firebase';
import 'firebase/firestore';
import { hashString } from '@helper/hashString';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function useIsReadConversation(userId) {
  console.log(userId);
  const firestore = firebase.firestore();

  const [isReadAll, setIsRead] = useState(true);

  const [notSeenCount, setNotSeenCount] = useState(0);

  const userRef = firestore
    .collection('user')
    .doc(userId || 'id')
    .collection(userId || 'id');

  const [users] = useCollectionData(userRef, { idField: 'id' });

  useEffect(() => {
    if (users && users.length > 0) {
      let tmpCount = 0;
      for (let i = 0; i < users.length; i++) {
        if (users[i].isRead === false) {
          tmpCount += 1;
          setIsRead(false);
        }
      }
      setNotSeenCount(tmpCount);
    }
  }, [users]);

  return { isReadAll, notSeenCount };
}

export default useIsReadConversation;
