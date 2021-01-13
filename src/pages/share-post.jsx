import React, { useContext, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import SharePost from 'components/Post/SharePost';
import { useRouter } from 'next/router';
import AuthContext from '@components/Auth/AuthContext';
import useSharePost from '@hooks/api/useSharePost';
import NavBar from '@components/NavBar';
import ChatBox from '@components/utils/ChatBox';
import { Container } from 'react-bootstrap';
import LoginRequired from '@components/SignIn/LoginRequired';
import Footer from '@components/Footer';

function SharePostPage() {
  const router = useRouter();
  const { getToken, isAuth } = useContext(AuthContext);
  const id = router.query.p;
  const { data, error, revalidate } = useSharePost(id);
  const [isError, setIsError] = useState(false);
  const [showChat, setShowChat] = useState(false);
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
  // if (isError) {
  //   return (
  //     <div>
  //       <p>error</p>
  //     </div>
  //   );
  // }
  return (
    <>
      <NextSeo
        title="Post | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/share-post`,
          title: 'Post | Vstay',
          description: 'Finding best place for your family',
        }}
      />

      <NavBar />
      {isAuth ? (
        <div className="mb-5 position-relative">
          {/* <button onClick={() => console.log(postData)}>click</button> */}
          <SharePost data={postData} onShowChat={() => setShowChat(!showChat)} />
          {showChat && (
            <ChatBox
              peerId={postData.poster}
              onShowChat={() => setShowChat(!showChat)}
            />
          )}
        </div>
      ) : (
        <LoginRequired />
      )}
      <Footer />
    </>
  );
}

export default SharePostPage;
