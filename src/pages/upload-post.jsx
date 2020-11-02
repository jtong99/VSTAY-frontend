import React from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import SharePost from '@components/UploadPost/SharePost';

function UploadPostPage() {
  return (
    <>
      <NextSeo
        title="Upload post | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/upload-post`,
          title: 'Upload post | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <SharePost />
    </>
  );
}

export default UploadPostPage;
