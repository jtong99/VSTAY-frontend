import firebase from './firebase';
import 'firebase/firestore';
import { hashString } from './hashString';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();

const messageRef = firestore.collection('messages');

export const setConversationChatDoneRead = async (userId, userFirebaseId) => {
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

export const updateReadElement = (id) => {};

export const getChatContent = (id) => {
  const ms = messageRef.doc(id).collection(id);

  const query = ms.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  return messages;
};
