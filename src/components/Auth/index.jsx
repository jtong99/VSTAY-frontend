import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchNewToken,
  fetchLogout,
  removeRefreshToken,
  setRefreshToken,
} from 'helper/auth';
import AuthContext from './AuthContext';
const timerPadding = 1000 * 60 * 1; // 1 minutes
import { SWRConfig } from 'swr';
import fetcher from '@helper/fetcher';

function Auth({ tokenData, ...props }) {
  const timer = useRef();
  const token = useRef();
  const [isAuth, setIsAuth] = useState(!!tokenData.value);

  const handleRenewToken = useCallback(async () => {
    clearTimeout(timer.current);
    const newToken = await fetchNewToken();
    if (!newToken) {
      token.current = null;
      setIsAuth(false);
    } else {
      token.current = newToken.value;
      if (!isAuth) {
        setIsAuth(true);
      }
      timer.current = setTimeout(
        handleRenewToken,
        newToken.exp * 1000 - Date.now() - timerPadding,
      );
    }
  }, [isAuth]);

  const login = useCallback(
    async (accessToken, refreshToken, firebaseToken) => {
      token.current = accessToken.value;
      clearTimeout(timer.current);
      timer.current = setTimeout(
        handleRenewToken,
        accessToken.exp * 1000 - Date.now() - timerPadding,
      );
      setRefreshToken(refreshToken.value, refreshToken.exp * 1000);
      setIsAuth(true);
      //   setTimeout(() => {
      //     firebase.auth().signInWithCustomToken(firebaseToken);
      //     // .then((value) => {
      //     //   console.log('successfully sign in');
      //     //   console.log(value.user.uid);
      //     // })
      //     // .catch((error) => {
      //     //   console.log(error);
      //     // });
      //   }, 1500);
    },
    [handleRenewToken],
  );

  const logout = useCallback(async () => {
    const loggedOut = await fetchLogout(token.current);
    if (loggedOut) {
      //   firebase
      //     .auth()
      //     .signOut()
      //     .then(() => {
      //       console.log('successful sign out');
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      removeRefreshToken();
      window.localStorage.setItem('logout', Date.now());
      token.current = null;
      setIsAuth(false);
    }
  }, [token]);

  const getToken = useCallback(() => {
    return token.current || tokenData.value;
  }, [token, tokenData.value]);

  useEffect(() => {
    const syncLogout = (e) => {
      if (e.key === 'logout') {
        token.current = null;
        setIsAuth(false);
      }
    };

    window.addEventListener('storage', syncLogout);
    return () => {
      window.removeEventListener('storage', syncLogout);
      window.localStorage.removeItem('logout');
    };
  }, []);

  useEffect(() => {
    if (tokenData.value) {
      clearTimeout(timer.current);
      token.current = tokenData.value;
      timer.current = setTimeout(
        handleRenewToken,
        tokenData.exp * 1000 - Date.now() - timerPadding,
      );
    } else {
      handleRenewToken();
    }
  }, [handleRenewToken, tokenData.exp, tokenData.value]);

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <AuthContext.Provider
        value={{
          token: token.current || tokenData.value,
          isAuth,
          login,
          logout,
          getToken,
        }}
        {...props}
      />
    </SWRConfig>
  );
}

export default Auth;
