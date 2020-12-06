import React, { useState } from 'react';
import LazyImage from '@components/utils/LazyImage';
import style from './Avatar.module.scss';
import { Button } from 'react-bootstrap';
import { Edit } from 'react-feather';
import ModalChangeAvatar from './ChangeAvatar';

function AvatarComponent({ avatar }) {
  const [showChangeAvatar, setShowChangeAvatar] = useState(false);
  return (
    <>
      <div className={style.wrapper}>
        <div style={{ marginTop: 15 }}>
          <LazyImage
            className={`rounded-circle overflow-hidden ${style.ava}`}
            variant="avatar"
            src={avatar}
            height={170}
            width={170}
          />
        </div>

        <div className={style.middle}>
          <Button
            variant="link"
            onClick={() => setShowChangeAvatar(!showChangeAvatar)}
            style={{
              color: 'Black',
              textDecoration: 'none',
              cursor: 'pointer',
              marginTop: 6,
            }}
          >
            <Edit />
            &nbsp;Edit
          </Button>
        </div>
      </div>
      <ModalChangeAvatar
        show={showChangeAvatar}
        handleShow={() => setShowChangeAvatar(true)}
        handleClose={() => setShowChangeAvatar(false)}
      />
    </>
  );
}

export default AvatarComponent;
