import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import requiredImg from './img/login-required.svg';
import Link from 'next/link';

function LoginRequired() {
  const router = useRouter();
  const { t } = useTranslation(['pop-video', 'common']);
  return (
    <Container style={{ minHeight: '90vh' }}>
      <Row>
        <Col lg={6}>
          <div
            className="login-required-text"
            style={{ paddingLeft: 68, paddingTop: 217 }}
          >
            <h6 style={{ fontWeight: 800, fontSize: 50, color: '#333333' }}>
              {t('Sign in required')}
            </h6>
            <p style={{ color: '#ACB5BD', fontSize: 17 }}>
              {t('You have to sign in to view this post')}.
            </p>
            <Link href={`/login?ref=${encodeURIComponent(router.asPath)}`} passHref>
              <Button
                as="a"
                variant="primary text-ligth"
                style={{
                  borderRadius: 15,
                  padding: '14px 37px 14px 37px',
                }}
              >
                {t('Sign in')}
              </Button>
            </Link>
          </div>
        </Col>
        <Col lg={6}>
          <div
            className="login-required-img"
            style={{ paddingRight: 49, height: '100%', width: '100%' }}
          >
            <div
              style={{
                position: 'absolute',
                backgroundImage: `url('${requiredImg}')`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden',
                width: '90%',
                height: '100%',
                top: '10%',
                left: '2%',
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginRequired;
