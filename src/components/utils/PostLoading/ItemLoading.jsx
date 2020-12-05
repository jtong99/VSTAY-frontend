import React from 'react';
import styles from './ItemLoading.module.scss';

function PostLoading(props) {
  return (
    <div {...props} className={styles.wrapper}>
      <div className={`${styles.img} ${styles.animatedBackground}`} />
      <div className={`${styles.h3_1} ${styles.animatedBackground}`} />
      <div className={`${styles.h3_2} ${styles.animatedBackground}`} />
      <div className={styles.h3_3} />
    </div>
  );
}

export default PostLoading;
