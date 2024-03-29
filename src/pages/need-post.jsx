import React, { useContext, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import NeedPost from 'components/Post/NeedPost';
import { useRouter } from 'next/router';
import AuthContext from '@components/Auth/AuthContext';
import useNeedPost from '@hooks/api/useNeedPost';
import NavBar from '@components/NavBar';
import LoginRequired from '@components/SignIn/LoginRequired';
import Footer from '@components/Footer';

function NeedPostPage() {
  const router = useRouter();
  const { getToken, isAuth } = useContext(AuthContext);
  const id = router.query.p;
  const { data, error, revalidate } = useNeedPost(id);
  const [isError, setIsError] = useState(false);
  const postData = data && data.result;
  useEffect(() => {
    if (!id) {
      setIsError(true);
    }
  }, [id]);
  useEffect(() => {
    if ((data && data.code !== 200) || error) {
      setIsError(true);
    }
  }, [error, data]);
  if (!data) {
    return <div>loading</div>;
  }
  return (
    <>
      <NextSeo
        title="Post | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/need-post`,
          title: 'Post | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <NavBar />
      {isAuth ? (
        <div className="mb-5">
          {/* <button onClick={() => console.log(postData)}>click</button> */}
          <NeedPost data={postData} />
        </div>
      ) : (
        <LoginRequired />
      )}
      <Footer />
    </>
  );
}
NeedPostPage.getInitialProps = async (context) => {
  return { namespacesRequired: ['common'] };
};
export default NeedPostPage;
