import { useState } from 'react';
import { fetcher } from 'helper';

function useFetch(path, { token = '', method = 'POST', isJSON = false } = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const doFetch = async (input = null, options) => {
    let body = null;
    if (input) {
      body = isJSON ? input : JSON.stringify(input);
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher({
        path,
        body,
        method,
        token,
        isJSON,
        ...options,
      });
      if (res && res.code >= 200 && res.code < 300) {
        setData(res);
        setLoading(false);
        return {
          data: res,
          loading: false,
          error: null,
        };
      }
      setError(res);
      setLoading(false);
      return {
        data: null,
        loading: false,
        error: res,
      };
    } catch (err) {
      setError(err);
      setLoading(false);
      return {
        data: null,
        loading: false,
        error: err,
      };
    }
  };
  return [doFetch, { loading, data, error }];
}

export default useFetch;
