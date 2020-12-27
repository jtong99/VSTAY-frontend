import React, { useContext, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import Chat from '@components/Chat';
import NavBar from '@components/NavBar';

function ChatPage() {
  return (
    <>
      <NextSeo
        title="Chat Page | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/chat`,
          title: 'Chat Page | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <NavBar />
      <Chat />
    </>
  );
}

export default ChatPage;
