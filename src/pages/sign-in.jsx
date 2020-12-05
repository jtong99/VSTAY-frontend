import React from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import SignInComponent from '@components/SignIn';

function SignInPage() {
  return (
    <>
      <NextSeo
        title="Sign in | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/sign-in`,
          title: 'Sign up | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <SignInComponent />
    </>
  );
}

SignInPage.getInitialProps = async () => {
  return { namespacesRequired: ['sign-in'] };
};

export default SignInPage;
