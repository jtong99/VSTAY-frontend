import React from 'react';
import ShareBtn from './ShareBtn';
import NeedButton from './NeedButton';
import Test from '@components/Test';
import { Container } from 'react-bootstrap';

function MainButton() {
  return (
    <div
      className="d-flex justify-content-between"
      style={{ padding: '24px 20rem 24px 20rem' }}
    >
      <NeedButton />
      <ShareBtn />
    </div>
  );
}

export default MainButton;
