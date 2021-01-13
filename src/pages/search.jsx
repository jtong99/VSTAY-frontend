import React, { useContext } from 'react';
import { NextSeo } from 'next-seo';
import { APP_URL } from 'app.config';
import NavBar from '@components/NavBar';
import { useRouter } from 'next/router';
import AuthContext from '@components/Auth/AuthContext';
import SearchResult from '@components/SearchResult';

function SearchPage() {
  const router = useRouter();
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      <NextSeo
        title="Search Results | Vstay"
        description={`Search results for "${router.query.q}"`}
        openGraph={{
          type: 'website',
          url: `${APP_URL}${router.asPath}`,
          title: 'Search Results | Vstay',
          description: `Search results for "${router.query.q}"`,
        }}
      />
      <div style={{ minHeight: '80vh' }}>
        <NavBar />
        <SearchResult />
        {/* {isAuth ? <SearchResult /> : <LoginRequired />} */}
        {/* <SearchResult /> */}
      </div>
    </>
  );
}
SearchPage.getInitialProps = async (context) => {
  return { namespacesRequired: ['common'] };
};
export default SearchPage;
