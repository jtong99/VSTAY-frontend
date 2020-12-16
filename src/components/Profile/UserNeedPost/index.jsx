import React from 'react';
import useNeedPost from '@hooks/api/useNeedPost';
import { Spinner } from 'react-bootstrap';
import PostList from '@components/utils/NeedPostList';
import { useTranslation } from 'i18n';

function UserNeedPost({ userId }) {
  const { data } = useNeedPost(userId);
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
      <div>
        <h3 style={{ fontWeight: 600 }}>{t('Needing Accommodation')}</h3>
      </div>
      <PostList data={data} loading={false} itemCounts={4} />
      {/* <button onClick={() => console.log(data)}>click</button> */}
    </div>
  );
}

export default UserNeedPost;
