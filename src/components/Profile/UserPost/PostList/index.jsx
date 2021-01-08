import React, { useState, useContext } from 'react';
import style from './PostList.module.scss';
import PostCard from '../PostCard';
import PostLoading from '@components/utils/PostLoading';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import Pagination from '@components/utils/Pagination';
import NoPost from '@assets/message/no_data.svg';
import { mutate } from 'swr';
import useFighter from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';

function ListPost({ data, loading, itemCounts = 3 }) {
  const { t } = useTranslation(['topnav']);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;
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
  if (!data) {
    return (
      <div className="text-center">
        <Image src={NoPost} style={{ maxWidth: 300 }} />
        <p>{t('No sharing post uploaded')}</p>
      </div>
    );
  }
  // if (data.result.length === 0) {
  //   return <div>no</div>;
  // }

  return (
    <>
      <div className={style.wrapper}>
        <div>
          <h3 style={{ fontWeight: 600 }}>{t('Sharing Accommodation')}</h3>
        </div>
        <div className={style.container}>
          {data.map((p, i) => (
            <PostCard
              key={`item-${i}`}
              data={p}
              onRemoveClick={async () => {
                const { data: delData } = await remove(
                  {
                    postID: p._id,
                    status: 'deleted',
                  },
                  {
                    path: `/v1/api/post/status`,
                  },
                );
                if (delData && delData.code === 200) {
                  // mutate([
                  //   composeQuery(`/v1/api/user-video-list/${listName}/search`, {
                  //     pageNumber: 1,
                  //     pageSize: 10,
                  //     sortBy: sortValue === 'asc' ? '' : 'newest',
                  //     keyword: searchValue,
                  //   }),
                  //   getToken() || '',
                  // ]);
                  // mutate([
                  //   composeQuery(`/v1/api/user-video-list`, {
                  //     pageNumber: 1,
                  //     pageSize: 5,
                  //   }),
                  //   getToken() || '',
                  // ]);
                  return true;
                }
                return false;
              }}
            />
          ))}
          {generateFakeItem()}
        </div>
      </div>
    </>
  );
}

export default ListPost;
