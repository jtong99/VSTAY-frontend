import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import composeQuery from 'helper/compose';
import { useTranslation, i18n } from 'i18n';
import { Menu, Star, Globe } from 'react-feather';
import ResultList from './ResultList';
import DropdownSelection from '@components/utils/DropdownSelection';
import CheckboxButton from '@components/utils/CheckboxButton';

import dynamic from 'next/dynamic';
// import useSearchUsers from '@hooks/apis/useSearchUsers';

function SearchResult() {
  const { t } = useTranslation(['search-rs', 'common']);
  const router = useRouter();

  const {
    q: keyword,
    sortBy = 'bestMatch',
    freeOnly,
    level = 'all',
    language = 'all',
  } = router.query;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [router.query]);
  // const { data } = useSearchUsers({
  //   pageSize: 20,
  //   pageNumber: 1,
  //   searchBy: 'name',
  //   keyword,
  // });
  // const userData = data && data.code === 200 ? data.users : [];
  const handleChangeQuery = (name, value) => {
    const newQuery = {
      ...router.query,
      [name]: value,
    };
    router.push(composeQuery('/search', newQuery));
  };

  return (
    <>
      <div className="container-fluid py-5 overflow-hidden">
        <div className="px-lg-5 d-flex flex-wrap justify-content-between align-items-center">
          <div className="mb-2">
            <h2 style={{ fontSize: '18px', fontWeight: 'normal', margin: 0 }}>
              {`${t('Search for')}`}
              <strong>{` "${keyword}"`}</strong>
            </h2>
          </div>
          <div className="d-flex flex-wrap align-items-center">
            <DropdownSelection
              className="mr-3 mb-2"
              icon={<Menu />}
              key={sortBy + i18n.language}
              defaultIndex={['bestMatch', 'newest'].indexOf(sortBy)}
              onChange={(value) => handleChangeQuery('sortBy', value)}
              items={[
                { value: 'newest', label: t('Newest') },
                { value: 'price', label: t('Price') },
                { value: 'mostView', label: t('Most View') },
                { value: 'mostLike', label: t('Most Like') },
              ]}
            />

            {/* <DropdownSelection
              className="mr-3 mb-2"
              icon={<Globe />}
              key={`language${language}${i18n.language}`}
              defaultIndex={['all', 'en', 'ko', 'vi'].indexOf(language)}
              onChange={(value) => handleChangeQuery('language', value)}
              items={[
                { label: t('Any Language'), value: 'all' },
                { label: 'English', value: 'en' },
                { label: 'Korean', value: 'ko' },
                { label: 'Vietnamese', value: 'vi' },
              ]}
            /> */}
            {/* <CheckboxButton
              label={t('only-freepop')}
              className="mb-2"
              defaultValue={freeOnly}
              onChange={(v) => handleChangeQuery('freeOnly', v)}
            /> */}
          </div>
        </div>

        {/* <h2
          className="font-weight-bold mt-5 mb-n2 px-lg-5"
          style={{ fontSize: '24px' }}
        >
          {t('Share Post')}
        </h2> */}
        <div className="px-lg-5">
          <ResultList key={router.asPath} />
        </div>
      </div>
    </>
  );
}

export default SearchResult;
