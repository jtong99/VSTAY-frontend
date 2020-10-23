import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { appWithTranslation } from 'i18n';
import '@styles/index.scss';
import Authentication from 'components/Auth';
import { fetchNewToken } from '@helper/auth';

function MyApp({ Component, pageProps, tokenData = {} }) {
  return (
    <>
      <Authentication tokenData={tokenData}>
        <Component {...pageProps} />
      </Authentication>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx: context }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(context)
    : {};
  try {
    const tokenData = await fetchNewToken(context);
    if (tokenData) {
      return {
        pageProps,
        tokenData,
      };
    }
  } catch (error) {
    // console.log(error.message);
  }
  return { pageProps };
};

export default appWithTranslation(MyApp);
