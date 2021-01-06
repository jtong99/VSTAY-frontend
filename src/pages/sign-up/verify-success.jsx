import React from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import Success from '@components/SignUp/VerifySuccess';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';

function verifySuccess() {
  return (
    <>
      <NextSeo
        title="Success | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/sign-up/verify-success`,
          title: 'Success | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <NavBar />
      <Success />
      <Footer />
    </>
  );
}

export default verifySuccess;
