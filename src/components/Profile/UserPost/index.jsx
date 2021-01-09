import React, { useState } from 'react';
import useUserSharePost from '@hooks/api/useUserSharePost';
import useCurrentSharePost from '@hooks/api/useCurrentSharePost';
import { Spinner } from 'react-bootstrap';
import PostList from './PostList';
import { useTranslation } from 'i18n';
import style from '../Profile.module.scss';
import Pagination from '@components/utils/Pagination';

function UserPost({ userId }) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;
  const { data, revalidate } = useCurrentSharePost({ pageNumber, pageSize });
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
  const { t } = useTranslation(['post']);
  if (!data) {
    return (
      <>
        <div>
          <Spinner size="sm" />
        </div>
      </>
    );
  }
  return (
    <div className="mt-5">
      <div className={style.padding}>
        <h3 style={{ fontWeight: 600 }}>{t('Sharing Accommodation')}</h3>
      </div>
      <PostList
        data={data.result}
        total={data.total}
        loading={false}
        itemCounts={4}
        onSuccessChange={revalidate}
      />
      <div className="d-flex justify-content-center">{renderPagination()}</div>

      {/* <button onClick={() => console.log(data)}>click</button> */}
    </div>
  );
}

export default UserPost;
