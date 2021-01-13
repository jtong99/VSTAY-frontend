import React, { useContext, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import AdminComp from '@components/Admin';
import NavBar from '@components/NavBar';

function AdminPage() {
  return (
    <>
      <NextSeo
        title="Admin Page | Vstay"
        description="Finding best place for your family"
        openGraph={{
          type: 'website',
          url: `${APP_URL}/admin`,
          title: 'Admin Page | Vstay',
          description: 'Finding best place for your family',
        }}
      />
      <NavBar />
      <AdminComp />
    </>
  );
}
AdminPage.getInitialProps = async (context) => {
  return { namespacesRequired: ['common'] };
};
export default AdminPage;
