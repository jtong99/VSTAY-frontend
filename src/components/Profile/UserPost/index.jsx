import React from 'react';
import useUserSharePost from '@hooks/api/useUserSharePost';
import { Spinner } from 'react-bootstrap';
import PostList from '@components/utils/PostList';

function UserPost({ userId }) {
  const { data } = useUserSharePost(userId);

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
      <PostList data={data} loading={false} />
      {/* <button onClick={() => console.log(data)}>click</button> */}
    </div>
  );
}

export default UserPost;
