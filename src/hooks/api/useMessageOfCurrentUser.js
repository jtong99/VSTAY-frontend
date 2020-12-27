import { useContext, useEffect } from 'react';
import firebase from '@helper/firebase';
import 'firebase/firestore';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function useMessageOfCurrentUser() {
  const { data: userData } = useCurrentUserData();
  const firestore = firebase.firestore();
  const currentUserId = userData && userData.code === 200 ? userData.user._id : 'id';

  const currentUserRef = firestore
    .collection('user')
    .doc(currentUserId)
    .collection(currentUserId);

  const currentUserQuery = currentUserRef.limit(25);

  const [currentUsers] = useCollectionData(currentUserQuery, { idField: 'id' });

  return currentUsers;
}

export default useMessageOfCurrentUser;
