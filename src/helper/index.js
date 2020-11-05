import { API_URL } from 'app.config';

export const enumToArray = function (enumObject) {
  const all = [];
  for (const key in enumObject) {
    all.push(enumObject[key]);
  }
  return all;
};

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

export const serverFetcher = async (
  path,
  method = 'GET',
  { token = '' } = { token: '' },
) => {
  try {
    const res = await fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return await res.json();
  } catch (error) {
    // console.log(error.message);
  }
  return null;
};

export default {
  fetcher,
  serverFetcher,
  enumToArray,
};
