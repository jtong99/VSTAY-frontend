import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import useSharePostByType from '@hooks/api/useSharePostByType';
import PostList from './PostList';
import Pagination from '@components/utils/Pagination';

function SharePost({ type }) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;
  const { data: sharePost, revalidate } = useSharePostByType(type, {
    pageSize,
    pageNumber,
  });
  if (!sharePost) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  const renderPagination = () => {
    const total = sharePost && sharePost.result && sharePost.result.total;
    console.log(total);
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
  return (
    <div>
      {/* <button onClick={() => console.log(sharePost)}>click</button> */}
      <PostList
        data={sharePost && sharePost.result}
        total={sharePost && sharePost.result}
        loading={false}
        itemCounts={4}
        onSuccessChange={revalidate}
      />
      <div className="d-flex justify-content-center">{renderPagination()}</div>
    </div>
  );
}

export default SharePost;
