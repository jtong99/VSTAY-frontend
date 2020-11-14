import fetch from 'unfetch';
import { API_URL } from 'app.config';

const fetcher = async (path, token) => {
  const res = await fetch(API_URL + path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      'cache-control': 'no-cache',
    },
  });

  const json = await res.json();

  return json;
};

export default fetcher;
