import React, { useState, useContext } from 'react';
import style from './PostList.module.scss';
import PostCard from '../PostCard';
import PostLoading from '@components/utils/PostLoading';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import Pagination from '@components/utils/Pagination';
import NoPost from '@assets/message/no-data.svg';
import { mutate } from 'swr';
import useFighter from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';
import composeQuery from '@helper/compose';

function ListPost({ data, loading, itemCounts = 3, onSuccessChange }) {
  const { t } = useTranslation(['topnav']);

  // const { data, loading } = useAllSharePost({
  //   sortBy: 'newest',
  //   pageSize,
  //   pageNumber,
  // });
  const { getToken } = useContext(AuthContext);

  const [remove] = useFighter(``, {
    token: getToken(),
    method: 'PATCH',
  });

  const generateFakeItem = () => {
    const items = [];
    const itemsCount = data.total % itemCounts;
    if (itemsCount === 0) {
      return null;
    }
    for (let i = 0; i < (itemsCount === 1 ? 2 : 1); i += 1) {
      items.push(<div key={`item-${i}`} style={{ minWidth: 400 }} />);
    }
    return items;
  };

  if (loading || !data) {
    return (
      <>
        <PostLoading />
      </>
    );
  }
  if (data.resultArray.length === 0) {
    return (
      <div
        className="text-center d-flex align-items-center justify-content-center"
        style={{ minHeight: '70vh' }}
      >
        <div>
          <Image src={NoPost} style={{ maxWidth: 300 }} />
          <p className="font-weight-600">{t('No post')}</p>
        </div>
      </div>
    );
  }
  // if (data.result.length === 0) {
  //   return <div>no</div>;
  // }

  return (
    <div style={{ minHeight: '70vh' }}>
      <div className={style.wrapper}>
        <div className={style.container}>
          {data.resultArray.map((p, i) => (
            <PostCard key={`item-${i}`} data={p} onSuccessChange={onSuccessChange} />
          ))}
          {generateFakeItem()}
        </div>
      </div>
    </div>
  );
}

export default ListPost;
