import React, { useContext, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import Languages from 'helper/languages';
import { i18n, useTranslation } from 'i18n';
import { useState } from 'react';

const updatePath = '/v1/api/user/me/profile';
const LanguageToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ color: 'inherit' }}
  >
    {children}
  </a>
));

function LanguageDropdown() {
  const [activeLang, setActiveLang] = useState(i18n.language || 'en');
  const { t } = useTranslation(['topnav']);
  const handleChangeLang = (lang) => async (e) => {
    i18n.changeLanguage(lang);
    setActiveLang(lang);
    // router.push(`${lang}${!['/vi', '/ko', '/en'].includes(router.asPath) ? router.asPath : ''}`);
  };

  return (
    <div className="text-justify text-nowrap">
      <span>{`${t('Language')}: `}</span>
      <Dropdown className="d-inline-block ml-2">
        <Dropdown.Toggle as={LanguageToggle} variant="link">
          {/* <img src={Languages.data[activeLang].icon} alt="" height="16px" /> */}
          <span className="ml-2 font-weight-bold" style={{ fontSize: 14 }}>
            {Languages.data[activeLang].label}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ zIndex: 1900 }} alignRight>
          {Languages.codes.map((code, index) => (
            <Dropdown.Item key={code} onClick={handleChangeLang(code)}>
              <img src={Languages.data[code].icon} alt="" height="16px" />
              <span className="ml-2 font-weight-bold">
                {Languages.data[code].label}
              </span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default LanguageDropdown;
