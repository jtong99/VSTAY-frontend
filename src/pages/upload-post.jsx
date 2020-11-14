import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import { useRouter } from 'next/router';
import SharePost from '@components/UploadPost/SharePost';
import NeedPost from '@components/UploadPost/NeedPost';

function UploadPostPage() {
  const router = useRouter();
  useEffect(() => {
    if (!router.query.t) {
      router.push('/');
    }
  }, []);
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
      {router.query.t === 'share' ? <SharePost /> : <NeedPost />}
    </>
  );
}

export default UploadPostPage;
