import React, { useState, useContext } from 'react';
import style from './NeedPostList.module.scss';
import PostCard from '../NeedPostCard';
import PostLoading from '@components/utils/PostLoading';
import { Button, Image } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import useAllNeedPost from '@hooks/api/useAllNeedPost';
import NoPost from '@assets/message/no-data.svg';
import Pagination from '@components/utils/Pagination';

import useFighter from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';

function NeedPostList({ itemCounts = 3, onSuccessChange, data, loading }) {
  const { t } = useTranslation(['topnav']);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 3;
  const { getToken } = useContext(AuthContext);
  console.log(data);
  const renderPagination = () => {
    const total = data && data.result && data.result.total;

    return (
      total > pageSize && (
        <Pagination
          page={pageNumber}
          pageSize={pageSize}
          itemsCount={total}
          onPageChange={(value) => setPageNumber(value)}
        />
      )
    );
  };
  const generateFakeItem = () => {
    const items = [];
    const itemsCount = data.total % itemCounts;
    if (itemsCount === 0) {
      return null;
    }
    for (let i = 0; i <= (itemsCount === 1 ? 2 : 1); i += 1) {
      items.push(<div key={`item-${i}`} style={{ minWidth: 400 }} />);
    }
    return items;
  };
  if (loading || !data) {
    return (
      <div style={{ minHeight: '70vh' }}>
        <PostLoading />
      </div>
    );
  }
  if (data.total === 0) {
    return (
      <div className="text-center" style={{ minHeight: '70vh' }}>
        <Image src={NoPost} style={{ maxWidth: 300 }} />
        <p className="font-weight-600">{t('No post')}</p>
      </div>
    );
  }
  return (
    <div style={{ minHeight: '70vh' }}>
      <div className={style.wrapper}>
        {/* <button onClick={() => console.log(data)}>click</button> */}
        {/* <div
          className="d-flex justify-content-between"
          style={{ padding: '0px 192px' }}
        >
          <h3 style={{ fontWeight: 600 }}>{t('Needing Accommodation')}</h3>
          {renderPagination()}
        </div> */}

        <div className={style.container}>
          {data.resultArray.map((p) => (
            <PostCard data={p} key={`item-${p._id}`} />
          ))}
          {generateFakeItem()}
        </div>
      </div>

      <div className="d-flex justify-content-center">{renderPagination()}</div>
    </div>
  );
}

export default NeedPostList;
