import React from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import useSearchSharePost from 'hooks/api/useSearchSharePost';
import { useTranslation } from 'i18n';
import PostItem from '@components/utils/PostCard';
import { useSWRPages } from 'swr';

function ResultList() {
  const { t } = useTranslation(['search-rs', 'common']);
  const router = useRouter();
  const {
    q: keyword,
    sortBy = 'newest',
    freeOnly,
    level = 'all',
    language = 'all',
  } = router.query;
  const { data, error } = useSearchSharePost({
    keyword,
    pageSize: 10,
    pageNumber: 1,
    sortBy,
  });

  const { pages, isLoadingMore, isReachingEnd, isEmpty, loadMore } = useSWRPages(
    router.asPath, // unique key for this data
    ({ offset, withSWR }) => {
      // console.log(offset);
      const { data } = withSWR(
        useSearchSharePost({
          keyword,
          pageSize: 10,
          pageNumber: offset || 1,
          sortBy,
        }),
      );

      const results = data && data.result ? data.result.hits : [];

      if (results.length === 0) return <div style={{ display: 'none' }} />;

      return results.map((v) => (
        <div
          key={v._id}
          style={{
            padding: '8px',
            margin: 17,
          }}
        >
          <PostItem data={{ ...v._source, _id: v._id }} />
        </div>
      ));
    },
    // last response => offset of next page
    ({ data }) => {
      return data &&
        data.pagination &&
        data.result &&
        data.pagination.pageNumber <
          Math.trunc(data.result.total.value / data.pagination.pageSize) +
            !!(data.result.total.value % data.pagination.pageSize)
        ? parseInt(data.pagination.pageNumber, 10) + 1
        : null;
    },
    // refresh data if follow params change
    [keyword, sortBy],
  );

  return (
    <>
      {/* post list
      <button onClick={() => console.log(data)}>click</button> */}
      <div className="mx-n3" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pages}
      </div>
      {isLoadingMore && (
        <Spinner
          animation="border"
          variant="primary"
          style={{
            display: 'block',
            margin: '24px auto',
          }}
        />
      )}
      {/* {isEmpty && <NoVideoResultFound className="mx-lg-5" />} */}
    </>
  );
}

export default ResultList;
