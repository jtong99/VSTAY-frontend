import React, { useContext, useState, useRef } from 'react';
import { Badge, Button, Image, Popover, Overlay, Nav } from 'react-bootstrap';
import useCurrentUser from '@hooks/api/useCurrentUserData';
import { Plus, MessageSquare, LogOut, User } from 'react-feather';
import AuthContext from '@components/Auth/AuthContext';
import ArrowDown from '@assets/img/down-arrow.svg';
import Link from 'next/link';
import { useTranslation } from 'i18n';
import LazyImage from '@components/utils/LazyImage';
import MapExplore from '@assets/img/earth.svg';
import { useRouter } from 'next/router';
import isNewChat from '@hooks/useIsReadChat';

function UserMenu() {
  const { t } = useTranslation(['topnav']);
  const router = useRouter();
  const { data } = useCurrentUser();
  const { logout } = useContext(AuthContext);

  //   const { data } = useCurrentUser();
  const user = data && data.user ? data.user : {};
  const { isReadAll, notSeenCount } = isNewChat(user && user._id);
  console.log(notSeenCount);
  const container = useRef();
  const target = useRef();
  const timer = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    timer.current = setTimeout(() => {
      setShow(false);
    }, 200);
  };

  const handleShow = () => {
    clearTimeout(timer.current);
    setShow(true);
  };
  return (
    <div className="d-flex">
      <Button
        // ref={target}
        variant="link"
        className="d-flex align-items-center m-auto"
        style={{ textDecoration: 'none' }}
      >
        <div style={{ position: 'relative' }}>
          <LazyImage
            className={`rounded-circle overflow-hidden `}
            variant="avatar"
            src={user.avatar}
            height={36}
            width={36}
          />
          {/* <Image
            variant="avatar"
            src={user.avatar}
            className="rounded-circle overflow-hidden"
            height={36}
            width={36}
          /> */}
        </div>
        <div className="ml-3">
          <div className="text-left">
            {/* <span className="text-dark">Hi,</span> */}
            <span
              className="ml-1 text-primary"
              style={{ fontWeight: 600, lineHeight: 1 }}
            >
              {user.name}
            </span>
          </div>
        </div>
      </Button>
      <Button
        // ref={target}
        onClick={() => router.push('/map-explore')}
        variant="link"
        style={{
          textDecoration: 'none',
          border: '1px solid #ACACAC',
          borderRadius: '50%',
          height: 37,
          width: 35,
          padding: 0,
          marginTop: 5,
        }}
      >
        <Image src={MapExplore} height="25px" />
        {/* <Plus style={{ color: '#000000', height: 20 }} /> */}
      </Button>
      <Button
        // ref={target}
        onClick={() => router.push('/chat')}
        variant="link"
        style={{
          textDecoration: 'none',
          border: '1px solid #ACACAC',
          borderRadius: '50%',
          height: 37,
          width: 35,
          padding: 0,
          marginTop: 5,
          marginLeft: 10,
          position: 'relative',
        }}
      >
        <MessageSquare style={{ color: '#000000', height: 20 }} />
        {notSeenCount > 0 && (
          <Badge
            variant="danger"
            style={{ marginLeft: 30, position: 'absolute', right: 0, marginTop: 30 }}
          >
            {notSeenCount > 10 ? '10+' : notSeenCount}
          </Badge>
        )}
      </Button>
      <Button
        ref={target}
        variant="link"
        style={{
          textDecoration: 'none',
          border: '1px solid #ACACAC',
          borderRadius: '50%',
          height: 37,
          width: 35,
          padding: 0,
          marginTop: 5,
          marginLeft: 10,
        }}
        onMouseOver={handleShow}
        onFocus={handleShow}
        onMouseOut={handleClose}
        onBlur={handleClose}
      >
        <Image src={ArrowDown} style={{ height: 17 }} />
      </Button>

      <Overlay
        show={show}
        placement="bottom"
        target={target.current}
        container={container.current}
        onHide={handleClose}
        rootClose
        rootCloseEvent="mousedown"
      >
        <Popover id="user-menu" content>
          <Nav
            onMouseOver={handleShow}
            onFocus={handleShow}
            onMouseOut={handleClose}
            onBlur={handleClose}
            className="flex-column"
          >
            <Nav.Item>
              <Link href="/profile" passHref>
                <Nav.Link>
                  <User style={{ marginRight: 6 }} height={18} />
                  {t('profile')}
                </Nav.Link>
              </Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Link href="/notification" passHref>
                <Nav.Link>
                  <Bell style={{ marginRight: 6 }} height={18} />
                  {t('notifications')}
                  {unseen > 0 && (
                    <Badge variant="danger" style={{ marginLeft: 6 }}>
                      {unseen > 10 ? '10+' : unseen}
                    </Badge>
                  )}
                </Nav.Link>
              </Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link onClick={logout} className="text-danger">
                <LogOut style={{ marginRight: 6 }} height={18} />
                {t('log-out')}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Popover>
      </Overlay>
      {/* <Button
        // ref={target}
        onClick={logout}
        variant="link"
        style={{
          textDecoration: 'none',
        }}
        // onMouseOver={handleShow}
        // onFocus={handleShow}
        // onMouseOut={handleClose}
        // onBlur={handleClose}
      >
        Sign out
      </Button> */}
    </div>
  );
}

export default UserMenu;
