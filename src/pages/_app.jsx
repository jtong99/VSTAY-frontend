import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { appWithTranslation } from 'i18n';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx: context }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(context)
    : {};

  return { pageProps };
};

export default appWithTranslation(MyApp);
