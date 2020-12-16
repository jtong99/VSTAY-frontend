import { useContext } from 'react';
import AuthContext from 'components/Auth/AuthContext';
import useSWR from 'swr';
import composeQuery from 'helper/compose';

function useSearchVideos(params, config) {
  const { getToken } = useContext(AuthContext);
  const response = useSWR(
    [composeQuery('/v1/api/post/search', params), getToken() || ''],
    config,
  );
  return response;
}

export default useSearchVideos;
