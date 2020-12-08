import React, { useState } from 'react';
import style from './PostList.module.scss';
import PostCard from '@components/utils/PostCard';
import PostLoading from '@components/utils/PostLoading';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import Pagination from '@components/utils/Pagination';
function ListPost({ data, loading }) {
  const { t } = useTranslation(['topnav']);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;
  // const { data, loading } = useAllSharePost({
  //   sortBy: 'newest',
  //   pageSize,
  //   pageNumber,
  // });
  const renderPagination = () => {
    const total = data && data.total;

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

  return (
    <>
      <div className={style.wrapper}>
        <div
        // className="d-flex justify-content-between"
        // style={{ padding: '0px 192px' }}
        >
          <h3 style={{ fontWeight: 600 }}>{t('Sharing Accommodation')}</h3>
          {/* {renderPagination()} */}
        </div>

        <div className={style.container}>
          {data.result.map((p) => (
            <PostCard data={p} />
          ))}
          {generateFakeItem()}
        </div>
      </div>
    </>
  );
}

export default ListPost;
