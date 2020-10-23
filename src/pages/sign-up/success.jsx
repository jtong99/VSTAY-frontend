import React from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';

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
      <div>sign up success</div>
    </>
  );
}

export default SignUpSuccess;
