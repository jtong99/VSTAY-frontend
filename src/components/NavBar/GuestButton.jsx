import React from 'react';
import Link from 'next/link';
import { Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';

//reruns
function GuestButton() {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  return (
    <Nav className="flex-row">
      <Nav.Item className="mr-3">
        <Link href={`/sign-in?ref=${encodeURIComponent(router.asPath)}`} passHref>
          <Nav.Link
            className="text-pink bg-dark"
            style={{
              fontSize: 16,
              fontWeight: 'lighter',
              padding: '7px 20px',
              borderRadius: 8,
            }}
          >
            {t('Sign In')}
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Link href="/sign-up" passHref>
        <Nav.Link
          className="text-dark"
          style={{
            fontSize: 16,
            fontWeight: 'lighter',
            padding: '7px 20px',
            borderRadius: 8,
          }}
        >
          {t('Sign Up')}
        </Nav.Link>
      </Link>
    </Nav>
  );
}

export default GuestButton;
