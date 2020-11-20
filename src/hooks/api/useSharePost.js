import { useContext } from 'react';
import useSWR from 'swr';
import AuthContext from 'components/Auth/AuthContext';

function useSharePost(id, config) {
  const { getToken } = useContext(AuthContext);
  const { data, error, revalidate } = useSWR(
    [`/v1/api/post/${id}`, getToken() || ''],
    config,
  );

  return { data, error, revalidate };
}

export default useSharePost;
