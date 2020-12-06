import React from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import ProfileComponent from '@components/Profile';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import Loading from '@components/utils/Loading';

function ProfilePage() {
  const { data: userData, error, revalidate } = useCurrentUserData();
  if (!userData) {
    return <Loading show={true} />;
  }
  return (
    <>
      <NextSeo
        title="Profile | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/profile`,
          title: 'Profile | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <NavBar />
      <ProfileComponent data={userData.user} />
      <Footer />
    </>
  );
}

export default ProfilePage;
