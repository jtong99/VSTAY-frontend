import firebase from './firebase';
import 'firebase/firestore';
import { hashString } from './hashString';

export const setConversationChatDoneRead = async (userId, userFirebaseId) => {
  const firestore = firebase.firestore();

  const currentUserRef = firestore.collection('user').doc(userId).collection(userId);
  await currentUserRef.doc(userFirebaseId).update({
    isRead: true,
  });
};

export const getGroupChatId = (userId1, userId2) => {
  const rs = `${
    hashString(userId1) <= hashString(userId2)
      ? `${userId1}-${userId2}`
      : `${userId2}-${userId1}`
  }`;
  return rs;
};
