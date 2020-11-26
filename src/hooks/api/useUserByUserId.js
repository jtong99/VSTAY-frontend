import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import AuthContext from 'components/Auth/AuthContext';

function useUserByUserId(id, config) {
  const { getToken } = useContext(AuthContext);

  const { data, error, revalidate } = useSWR(
    [`/v1/api/user/${id}`, getToken() || ''],
    config,
  );

  return { data, error, revalidate };
}

export default useUserByUserId;
