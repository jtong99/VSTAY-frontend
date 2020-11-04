/**
 * Function to get query string from a path and params object.
 * @param {string} path
 * @param {object} params
 * @returns {string} query string
 */

const composeQuery = (path, params) => {
  if (!params) return path;

  const paramArray = Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => `${key}=${params[key]}`);

  return `${path}?${paramArray.join('&')}`;
};

export default composeQuery;
