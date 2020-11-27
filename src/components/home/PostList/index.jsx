import React from 'react';
import style from './PostList.module.scss';
import PostCard from '@components/utils/PostCard';
import { Container } from 'react-bootstrap';

function ListPost({ data }) {
  const generateFakeItem = () => {
    const items = [];
    const itemsCount = data.total % 3;
    if (itemsCount === 0) {
      return null;
    }
    for (let i = 0; i < (itemsCount === 1 ? 2 : 1); i += 1) {
      items.push(<div key={`item-${i}`} style={{ minWidth: 400 }} />);
    }
    return items;
  };
  if (!data) {
    return <div />;
  }
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          {data.resultArray.map((p) => (
            <PostCard data={p} />
          ))}
          {generateFakeItem()}
        </div>
      </div>
    </>
  );
}

export default ListPost;
