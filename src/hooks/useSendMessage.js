import React from 'react';
import firebase from '@helper/firebase';
import 'firebase/firestore';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import { hashString } from '@helper/hashString';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function useSendMessage({ peerId = 'id', message }) {
  const firestore = firebase.firestore();
  //   const messagesRef = firestore.collection('messages');

  const { data: userData } = useCurrentUserData();

  const currentUserId = userData && userData.user && userData.user._id;

  const groupChatId = `${
    hashString(currentUserId) <= hashString(peerId)
      ? `${currentUserId}-${peerId}`
      : `${peerId}-${currentUserId}`
  }`;

  const messageRefDoc = firestore.collection('messages').doc(groupChatId);

  const messagesRef = firestore
    .collection('messages')
    .doc(groupChatId)
    .collection(groupChatId);

  const currentUserRef = firestore
    .collection('user')
    .doc(currentUserId)
    .collection(currentUserId);

  const peerUserRef = firestore.collection('user').doc(peerId).collection(peerId);

  const query = messagesRef.orderBy('createdAt').limit(25);
  const currentUserQuery = currentUserRef.limit(25);
  const peerUserQuery = peerUserRef.limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [currentUsers] = useCollectionData(currentUserQuery, { idField: 'id' });
  const [peerUsers] = useCollectionData(peerUserQuery, { idField: 'id' });

  const isPeerIdInside = currentUsers && currentUsers.some((u) => u.uid === peerId);
  const isCurrentUserInsidePeerUser =
    peerUsers && peerUsers.some((p) => p.uid === currentUserId);
  const sendMessage = async () => {
    const {
      user: { _id, avatar },
    } = userData;

    //Insert or update last message and is read into user
    if (!isCurrentUserInsidePeerUser) {
      await peerUserRef.add({
        uid: currentUserId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: avatar,
        lastMessage: message,
        isRead: false,
        groupId: groupChatId,
      });
    } else {
      const id = peerUsers.find((u) => u.uid === currentUserId).id;
      await peerUserRef.doc(id).update({
        lastMessage: message,
        isRead: false,
        photoURL: avatar,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    if (!isPeerIdInside) {
      await currentUserRef.add({
        uid: peerId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: avatar,
        lastMessage: message,
        isRead: true,
        groupId: groupChatId,
      });
    } else {
      const id = currentUsers.find((u) => u.uid === peerId).id;
      await currentUserRef.doc(id).update({
        lastMessage: message,
        photoURL: avatar,
        isRead: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    await messagesRef.add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: _id,
      photoURL: avatar,
      isRead: false,
    });
  };
  return [sendMessage];
}

export default useSendMessage;
