import { useContext } from 'react';
import useSWR from 'swr';
import AuthContext from 'components/Auth/AuthContext';
import composeQuery from 'helper/compose';

function useSharePostByType(type, params, config) {
  const { getToken } = useContext(AuthContext);
  const { data, error, revalidate } = useSWR(
    [composeQuery(`/v1/api/post/type/${type}`, params), getToken() || ''],
    config,
  );

  return { data, error, revalidate };
}

export default useSharePostByType;
