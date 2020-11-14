import React from 'react';
import NeedAction from './NeedAction';
import ShareAction from './ShareAction';

function ActionBtn() {
  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ padding: '24px 20rem 24px 20rem' }}
      >
        <NeedAction />
        <ShareAction />
      </div>
    </>
  );
}

export default ActionBtn;
