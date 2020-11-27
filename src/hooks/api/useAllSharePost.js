import { useContext } from 'react';
import useSWR from 'swr';
import AuthContext from 'components/Auth/AuthContext';

function useAllSharePost(config) {
  const { getToken } = useContext(AuthContext);
  const { data, error, revalidate } = useSWR(
    [`/v1/api/post/all`, getToken() || ''],
    config,
  );

  return { data, error, revalidate };
}

export default useAllSharePost;
