import React from 'react';
import Item from './ItemLoading';
import styles from './PostLoading.module.scss';

function PostLoading() {
  const items = [];

  for (let index = 0; index < 9; index += 1) {
    items.push(<Item key={`item${index}`} />);
  }
  return <div className={styles.wrapper}>{items}</div>;
}

export default PostLoading;
