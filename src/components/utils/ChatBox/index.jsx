import React, { useRef, useState, useEffect } from 'react';
import style from './ChatBox.module.scss';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '@helper/firebase';
import 'firebase/firestore';
import ChatMessage from './ChatMessage';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import { hashString } from '@helper/hashString';
import { Button, Form } from 'react-bootstrap';
import { X } from 'react-feather';

function ChatBox({ peerId, onShowChat }) {
  const dummy = useRef();
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
  const [formValue, setFormValue] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();

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
        lastMessage: formValue,
        isRead: false,
      });
    } else {
      const id = peerUsers.find((u) => u.uid === currentUserId).id;
      await peerUserRef.doc(id).update({
        lastMessage: formValue,
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
        lastMessage: formValue,
        isRead: true,
      });
    } else {
      const id = currentUsers.find((u) => u.uid === peerId).id;
      await currentUserRef.doc(id).update({
        lastMessage: formValue,
        photoURL: avatar,
        isRead: true,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: _id,
      photoURL: avatar,
      isRead: false,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <div className={style.wrapper}>
        <div style={{ border: '1px solid #e3e3e3' }}>
          {/* <button onClick={() => console.log(currentUserId)}>click</button> */}
          <Button onClick={onShowChat} variant="link">
            <X />
          </Button>
        </div>
        <div className="mb-5" className={style.messageContainer}>
          {messages &&
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                currentUserId={currentUserId}
              />
            ))}

          <span ref={dummy}></span>
        </div>
        <Form onSubmit={sendMessage} className="d-flex">
          <Form.Control
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
          />

          <Button type="submit" disabled={!formValue}>
            Send
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ChatBox;
