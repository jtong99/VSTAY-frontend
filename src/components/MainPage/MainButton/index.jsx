import React from 'react';
import ShareButton from './ShareBtn';
import NeedButton from './NeedButton';
import { Container } from 'react-bootstrap';

function MainButton() {
  return (
    <div
      className="d-flex justify-content-between"
      style={{ padding: '24px 20rem 24px 20rem' }}
    >
      <NeedButton />
      <ShareButton />
    </div>
  );
}

export default MainButton;
