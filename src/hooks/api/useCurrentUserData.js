import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import AuthContext from 'components/Auth/AuthContext';

/**
 * React hook to get detail of current user
 * @param {object} config - SWR config
 * @returns SWR response
 */

function useCurrentUser(config) {
  const { getToken } = useContext(AuthContext);

  const { data, error, revalidate } = useSWR(
    ['/v1/api/user/me', getToken() || ''],
    config,
  );

  return { data, error, revalidate };
}

export default useCurrentUser;
