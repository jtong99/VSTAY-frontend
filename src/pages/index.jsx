import React from 'react';
import NavBar from '@components/NavBar';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import MainButton from '@components/MainPage/MainButton';
import PostList from '@components/MainPage/PostList';

function MainPage() {
  return (
    <>
      <NextSeo
        title="Main page | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}`,
          title: 'Main page | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <div>
        <NavBar />
        <MainButton />
        <PostList />
      </div>
    </>
  );
}

export default MainPage;
