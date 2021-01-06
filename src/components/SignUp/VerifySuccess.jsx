import React from 'react';
import background from '@assets/message/verify-success.svg';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useTranslation } from 'i18n';

function VerifySuccess() {
  const { t } = useTranslation(['join', 'common']);
  const router = useRouter();
  return (
    <Container
      style={{
        marginTop: '5%',
        minHeight: '61vh',
      }}
    >
      <Row>
        <Col lg={6}>
          <div>
            <div
              className="adver-text-session"
              style={{ paddingLeft: 56, paddingTop: 50 }}
            >
              <h6 style={{ fontWeight: 800, fontSize: 50, maxWidth: 570 }}>
                {t('Great!')}
              </h6>

              <p
                className="mt-5 text-black"
                style={{
                  lineHeight: '1.8rem',
                  padding: 0,
                  fontSize: '17px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {t('System verified your email successfully, you can sign in now.')}
              </p>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => router.push('/sign-in')}
                style={{
                  minWidth: 164,
                  padding: '14px 40px 14px 40px',
                }}
              >
                {t('Sign in')}
              </Button>
            </div>
          </div>
        </Col>
        <Col lg={6} style={{ paddingRight: 30 }}>
          <div>
            <div
              style={{
                backgroundImage: `url('${background}')`,
                backgroundPosition: 'center center',
                height: 400,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default VerifySuccess;
