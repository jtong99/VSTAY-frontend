import React, { useState } from 'react';
import useNeedPost from '@hooks/api/useNeedPost';
import { Spinner, Image } from 'react-bootstrap';
import PostList from './NeedPostList';
import { useTranslation } from 'i18n';
// import style from '../Profile.module.scss';
import useNeedPostByType from '@hooks/api/useNeedPostByType';

function UserNeedPost({ type }) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;
  const { data: sharePost, loading, revalidate } = useNeedPostByType(type, {
    pageSize,
    pageNumber,
  });
  const { t } = useTranslation(['post']);
  if (!sharePost) {
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
      {/* <div>
        <h3 style={{ fontWeight: 600 }}>{t('Needing Accommodation')}</h3>
      </div> */}
      <PostList
        data={sharePost && sharePost.result}
        loading={loading}
        itemCounts={3}
        onSuccessChange={revalidate}
      />
      {/* <button onClick={() => console.log(data)}>click</button> */}
    </div>
  );
}

export default UserNeedPost;
