import { useState, useEffect } from 'react';
import firebase from '@helper/firebase';
import 'firebase/firestore';
import { hashString } from '@helper/hashString';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function useIsReadConversation(userId1, userId2) {
  const firestore = firebase.firestore();

  const [isRead, setIsRead] = useState(true);

  const groupChatId = `${
    hashString(userId1) <= hashString(userId2)
      ? `${userId1}-${userId2}`
      : `${userId2}-${userId1}`
  }`;

  const messagesRef = firestore
    .collection('messages')
    .doc(groupChatId)
    .collection(groupChatId);

  const [messages] = useCollectionData(messagesRef, { idField: 'id' });

  useEffect(() => {
    console.log(groupChatId);
    if (messages && messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        console.log(messages[i]);
        if (messages[i].isRead === false) {
          setIsRead(false);
        }
      }
    }
  }, [messages]);

  return isRead;
}

export default useIsReadConversation;
