import { useState } from 'react';
import firebase from '@helper/firebase';
import 'firebase/firestore';

function useMessage() {
  const firestore = firebase.firestore();
  const [message, setMessage] = useState('');
  return <div></div>;
}

export default useMessage;
