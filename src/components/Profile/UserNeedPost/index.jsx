import React, { useState } from 'react';
import useNeedPost from '@hooks/api/useNeedPost';
import { Spinner, Image } from 'react-bootstrap';
import PostList from './NeedPostList';
import { useTranslation } from 'i18n';
import style from '../Profile.module.scss';
import useNeedPostOfCurrentUser from '@hooks/api/useNeedPostOfCurrentUser';
import NoPost from '@assets/message/no-data.svg';

function UserNeedPost({ userId }) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;
  const { data, revalidate, loading } = useNeedPostOfCurrentUser({
    pageNumber,
    pageSize,
  });
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
  if (data.code !== 200) {
    return (
      <>
        <div className={style.padding}>
          <h3 style={{ fontWeight: 600 }}>{t('Needing Accommodation')}</h3>
        </div>
        <div className="text-center">
          <Image src={NoPost} style={{ maxWidth: 300 }} />
          <p className="font-weight-600">{t('No post uploaded')}</p>
        </div>
      </>
    );
  }
  return (
    <div className="mt-5">
      <div className={style.padding}>
        <h3 style={{ fontWeight: 600 }}>{t('Needing Accommodation')}</h3>
      </div>
      <PostList
        data={data.result}
        loading={loading}
        itemCounts={3}
        onSuccessChange={revalidate}
      />
      {/* <button onClick={() => console.log(data)}>click</button> */}
    </div>
  );
}

export default UserNeedPost;
