import React from 'react';
import styles from './loading.module.scss';

function LoadingComponent({ show = false }) {
  return (
    <div className={`${styles.spanner} ${show ? styles.show : ''}`}>
      <div className={`${styles.loader} ${show ? styles.show : ''}`}></div>
    </div>
  );
}

export default LoadingComponent;
