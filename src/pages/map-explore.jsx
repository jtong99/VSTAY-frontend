import React, { useContext, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import NeedPost from 'components/Post/NeedPost';
import { useRouter } from 'next/router';
import AuthContext from '@components/Auth/AuthContext';
import MapExplore from '@components/MapExplore';

function MapExplorePage() {
  return (
    <>
      <NextSeo
        title="Map Expore | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/map-explore`,
          title: 'Map Expore | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <MapExplore />
    </>
  );
}

export default MapExplorePage;
