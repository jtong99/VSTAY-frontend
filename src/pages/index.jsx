import React from 'react';
import NavBar from '@components/NavBar';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import ActionBtn from '@components/home/ActionBtn';
import ListPost from '@components/home/PostList';
import NeedPostList from '@components/home/NeedPostList';
import Footer from '@components/Footer';

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
        <ActionBtn />

        <ListPost />
        <NeedPostList />
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
