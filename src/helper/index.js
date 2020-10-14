import { API_URL } from 'app.config';

export const fetcher = async ({
  path,
  token = '',
  method = 'POST',
  body = {},
  isJSON = false,
}) => {
  const res = await fetch(API_URL + path, {
    method,
    body,
    headers: isJSON
      ? {
          Authorization: token,
        }
      : {
          'Content-Type': 'application/json',
          Authorization: token,
        },
  });

  const json = await res.json();

  return json;
};

export default {
  fetcher,
};
