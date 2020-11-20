import { useContext } from 'react';
import useSWR from 'swr';
import AuthContext from 'components/Auth/AuthContext';

function useNeedPost(id, config) {
  const { getToken } = useContext(AuthContext);
  const { data, error, revalidate } = useSWR(
    [`/v1/api/need-post/${id}`, getToken() || ''],
    config,
  );

  return { data, error, revalidate };
}

export default useNeedPost;
