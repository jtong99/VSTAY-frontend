import React from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import SignUpComponent from '@components/SignUp';

function SignUpPage() {
  return (
    <>
      <NextSeo
        title="Sign up | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/sign-up`,
          title: 'Sign up | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <SignUpComponent />
    </>
  );
}

SignUpPage.getInitialProps = async () => {
  return { namespacesRequired: ['sign-up'] };
};

export default SignUpPage;
