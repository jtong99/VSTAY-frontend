import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
import { API_URL } from 'app.config';

const cookieName = 'RF-Token';

export const setRefreshToken = (token, expires) => {
  cookie.set(cookieName, token.replace('Bearer ', 'brr.'), {
    expires: new Date(expires),
    sameSite: 'strict',
    // secure: process.env.NODE_ENV === 'production',
    // domain: process.env.NODE_ENV === 'production' && '.knowllipop.com',
  });
};

export const getRefreshToken = (context = null) => {
  let token = '';
  if (context) {
    const cookies = nextCookie(context);
    token = cookies[cookieName];
  } else {
    token = cookie.get(cookieName);
  }
  return token ? token.replace('brr.', 'Bearer ') : null;
};

export const removeRefreshToken = () => {
  cookie.remove(cookieName);
};

export const redirectTo = (path, context) => {
  if (typeof window !== 'undefined') {
    Router.push(path);
  } else {
    context.res.writeHead(302, { Location: path }).end();
  }
};

export const fetchNewToken = async (context = null) => {
  const refreshToken = getRefreshToken(context);

  if (!refreshToken) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/v1/auth/refresh-token`, {
      headers: {
        'X-Refresh-Token': refreshToken,
        'cache-control': 'no-cache',
      },
    });
    const json = await res.json();
    return json && json.code === 201 ? json.accessToken : null;
  } catch (error) {
    // console.log(error.message);
  }

  return null;
};

export const fetchLogout = async (token) => {
  const res = await fetch(`${API_URL}/v1/auth/logout`, {
    headers: {
      Authorization: token,
      'cache-control': 'no-cache',
    },
  });
  const json = await res.json();
  if (json && json.code === 200) {
    return true;
  }
  return false;
};

const auth = (context) => {
  const token = getRefreshToken(context);
  if (!token) {
    redirectTo(`/login?ref=${encodeURIComponent(context.asPath)}`, context);
    return false;
  }
  return true;
};

export default auth;
