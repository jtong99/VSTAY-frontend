import React from 'react';
import NeedAction from './NeedAction';
import ShareAction from './ShareAction';
import styles from './Container.module.scss';

function ActionBtn() {
  return (
    <>
      <div
        className={`d-flex justify-content-between flex-wrap ${styles.wrapper}`}
        // style={{ padding: '24px 20rem 24px 20rem' }}
      >
        <NeedAction />
        <ShareAction />
      </div>
    </>
  );
}

export default ActionBtn;
