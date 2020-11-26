import React from 'react';
import style from './ChatBox.module.scss';

import LazyImage from '@components/utils/LazyImage';

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const { currentUserId } = props;
  const messageClass = uid === currentUserId ? style.sent : style.received;
  return (
    <>
      <div className={`${style.message} ${messageClass}`}>
        <LazyImage
          variant="avatar"
          src={photoURL}
          style={{ borderRadius: '50%', margin: '2px 5px' }}
          width="40px"
          height="40px"
        />
        {/* <img
          className={style.avatar}
          src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}
        /> */}
        <p className={style.messageText}>{text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
