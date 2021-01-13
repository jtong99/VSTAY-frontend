import React, { useState } from 'react';
import style from './NeedPostList.module.scss';
import PostCard from '@components/utils/NeedPostCard';
import PostLoading from '@components/utils/PostLoading';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import useAllNeedPost from '@hooks/api/useAllNeedPost';
import Pagination from '@components/utils/Pagination';

function NeedPostList() {
  const { t } = useTranslation(['common']);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;
  const { data, loading } = useAllNeedPost({
    sortBy: 'newest',
    pageSize,
    pageNumber,
  });
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
    const itemsCount = data.total % 3;
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
      <>
        <PostLoading />
      </>
    );
  }
  return (
    <>
      <div className={style.wrapper}>
        {/* <button onClick={() => console.log(data)}>click</button> */}
        <div className={`d-flex justify-content-between ${style.pagination}`}>
          <h3 style={{ fontWeight: 600 }}>{t('Needing Accommodation')}</h3>
          {renderPagination()}
        </div>

        <div className={style.container}>
          {data.result.resultArray.map((p) => (
            <PostCard data={p} />
          ))}
          {generateFakeItem()}
        </div>
      </div>
    </>
  );
}

export default NeedPostList;
