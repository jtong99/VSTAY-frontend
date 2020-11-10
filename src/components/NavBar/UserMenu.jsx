import React, { useContext } from 'react';
import { Badge, Button, Image, Popover, Overlay, Nav } from 'react-bootstrap';
import useCurrentUser from '@hooks/api/useCurrentUserData';
import { Plus } from 'react-feather';
import { useRouter } from 'next/router';
import AuthContext from '@components/Auth/AuthContext';

function UserMenu() {
  const router = useRouter();
  const { data } = useCurrentUser();
  const { logout } = useContext(AuthContext);
  //   const { data } = useCurrentUser();
  const user = data && data.user ? data.user : {};
  return (
    <div className="d-flex">
      <Button
        // ref={target}
        variant="link"
        className="d-flex align-items-center m-auto"
        style={{ textDecoration: 'none' }}
        // onMouseOver={handleShow}
        // onFocus={handleShow}
        // onMouseOut={handleClose}
        // onBlur={handleClose}
      >
        <div style={{ position: 'relative' }}>
          <Image
            variant="avatar"
            src={user.avatar}
            className="rounded-circle overflow-hidden"
            height={36}
            width={36}
          />
        </div>
        <div className="ml-3">
          <div className="text-left">
            <span className="text-dark">Hi,</span>
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
        onClick={() => router.push('/upload-post')}
        variant="link"
        style={{
          textDecoration: 'none',
          border: '1px solid #ACACAC',
          borderRadius: '50%',
          padding: 10,
        }}
        // onMouseOver={handleShow}
        // onFocus={handleShow}
        // onMouseOut={handleClose}
        // onBlur={handleClose}
      >
        <Plus />
      </Button>
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
