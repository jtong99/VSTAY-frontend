import React from 'react';
import useUserSharePost from '@hooks/api/useUserSharePost';
import { Spinner } from 'react-bootstrap';
import PostList from '@components/utils/PostList';
import { useTranslation } from 'i18n';

function UserPost({ userId }) {
  const { data } = useUserSharePost(userId);
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
        <h3 style={{ fontWeight: 600 }}>{t('Sharing Accommodation')}</h3>
      </div>
      <PostList data={data.result} total={data.total} loading={false} />
      {/* <button onClick={() => console.log(data)}>click</button> */}
    </div>
  );
}

export default UserPost;
