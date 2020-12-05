import React from 'react';
import NavBar from '@components/NavBar';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import ActionBtn from '@components/home/ActionBtn';
import ListPost from '@components/home/PostList';
import useAllSharePost from '@hooks/api/useAllSharePost';

function MainPage() {
  const { data, loading } = useAllSharePost({ sortBy: 'newest' });

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
        <ListPost data={data && data.result} loading={loading} />
      </div>
    </>
  );
}

export default MainPage;
