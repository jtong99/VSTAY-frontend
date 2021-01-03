import React from 'react';
import LazyImage from '@components/utils/LazyImage';
import useUserByUserId from '@hooks/api/useUserByUserId';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import styles from './ChatElement.module.scss';
import { Button } from 'react-bootstrap';
import { formatTimeRange } from '@helper/format';
import useIsReadChat from '@hooks/useIsReadChat';
import {
  setConversationChatDoneRead,
  getGroupChatId,
  getChatContent,
} from '@helper/firebaseHelper';

function ChatELement({
  data: { uid, lastMessage, isRead, createdAt, updatedAt, id, groupId },
  onSetPeerId,
}) {
  const { data } = useUserByUserId(uid);
  const { data: currentUserData } = useCurrentUserData();

  const user = data && data.code === 200 ? data.user : '';
  const currentUser =
    currentUserData && currentUserData.code === 200 ? currentUserData.user : '';
  const isReadConversation = useIsReadChat(currentUser._id || '', uid);
  const onClickGroupChat = async () => {
    onSetPeerId(user._id);
    await setConversationChatDoneRead(currentUser._id, id);
  };
  return (
    <Button
      variant="link"
      onClick={onClickGroupChat}
      className={`btn-div w-100 ${styles.hoverBtn}`}
    >
      <div className="d-flex">
        <LazyImage
          className={`rounded-circle overflow-hidden `}
          variant="avatar"
          src={user.avatar}
          height={56}
          width={56}
        />
        <div className="d-flex align-items-center ml-3">
          <div>
            <h6 className={`m-0 ${styles.name} ${isRead ? '' : 'font-weight-600'}`}>
              {user.name}
            </h6>
            <p
              className={`m-0 ${styles.lastMessage} ${
                isRead ? 'text-secondary' : 'font-weight-600 text-primary'
              }`}
            >
              {lastMessage} <span> · </span>{' '}
              {updatedAt && formatTimeRange(new Date(updatedAt.seconds * 1000))}
            </p>
          </div>
        </div>
      </div>
    </Button>
  );
}

export default ChatELement;
