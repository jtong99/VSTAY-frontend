import React from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import Success from '@components/SignUp/Success';
import NavBar from '@components/NavBar';

function SignUpSuccess() {
  return (
    <>
      <NextSeo
        title="Success | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/sign-up/success`,
          title: 'Success | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <NavBar />
      <Success />
    </>
  );
}

export default SignUpSuccess;
