import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import logo from '@assets/logo/Logo_585x166.svg';
import ArrowLeft from './img/ArrowLeft.svg';
import { useTranslation } from 'i18n';

function TopBar({ currentStep, downStep }) {
  const { t } = useTranslation(['topnav']);
  return (
    <>
      <Container style={{ paddingTop: 75 }}>
        <div className="d-flex justify-content-between">
          {currentStep > 0 && (
            <Button
              variant="link"
              onClick={downStep}
              className="font-weight-bold text-dark"
            >
              <Image src={ArrowLeft} alt="arrow left" className="mr-2 mb-1" />
              {t('Back')}
            </Button>
          )}
          <Link href="/" passHref>
            <a style={{ position: 'relative', transition: '400ms' }}>
              <Image src={logo} alt="Vstay" height="50px" />
            </a>
          </Link>
          <Link href="/" passHref>
            <Button variant="link" className="font-weight-bold text-dark">
              {t('Exit')}
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default TopBar;
