import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import AuthContext from 'components/Auth/AuthContext';

function useDataCount(config) {
  const { getToken } = useContext(AuthContext);

  const { data, error, revalidate } = useSWR(
    ['/v1/api/post/count', getToken() || ''],
    config,
  );

  return { data, error, revalidate };
}

export default useDataCount;
