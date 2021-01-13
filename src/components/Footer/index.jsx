import React from 'react';
import logo from '@assets/logo/Logo_585x166.svg';
import { useTranslation } from 'i18n';
import { Container, Row, Col, Image } from 'react-bootstrap';
import style from './Footer.module.scss';
import { Facebook, Instagram, Twitter } from 'react-feather';
import LanguageDropdown from '@components/utils/LanguageDropdown';

function Footer() {
  const { t } = useTranslation(['footer', 'common']);
  return (
    <Container
      as="footer"
      fluid
      className={`${style.wrapper}`}
      //   style={{ minHeight: '20vh' }}
    >
      <div className="d-flex justify-content-between">
        <div style={{ maxWidth: 500 }}>
          <Image src={logo} width="100px" />
          <p className="mt-4">
            {t(
              'Vstay is a peer to peer listing site for those looking for shared homes or those looking for a flatmate. Simply create a listing, search and connect.',
            )}
          </p>
        </div>
        <div>
          <div>
            <LanguageDropdown />
          </div>
          <p>{t('Connect with us on')}:</p>

          <div className="d-flex flex-wrap mt-3">
            <div>
              <a className={style.icon} href="/https://facebook.com">
                <Facebook width="20px" />
              </a>
            </div>

            <div className="mt-4 mt-lg-0">
              <a className={style.icon} href="/https://instagram.com">
                <Instagram width="20px" />
              </a>
            </div>

            <div className="mt-4 mt-lg-0">
              <a className={style.icon} href="/https://twitter.com">
                <Twitter width="20px" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
