import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import logo from '@assets/logo/Logo_585x166.svg';
import { useTranslation } from 'i18n';

function TopBar() {
  const { t } = useTranslation(['topnav']);
  return (
    <>
      <Container style={{ paddingTop: 75 }}>
        <div className="d-flex justify-content-between">
          <Link href="/" passHref>
            <a>
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
