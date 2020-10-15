import React, { useState } from 'react';
import {
  Container,
  Image,
  Form,
  FormControl,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Logo from '@assets/logo/Logo_585x166.svg';
import style from './SignIn.module.scss';
import Link from 'next/link';
import HeadImage from './img/LogInImage.svg';
import GoogleLogo from './img/google-logo.svg';
import { useTranslation } from 'i18n';
import { Eye, EyeOff } from 'react-feather';

function SignInComponent() {
  const [showPasswd, setShowPasswd] = useState(false);
  const { t } = useTranslation(['signin']);
  return (
    <Container>
      <div className={style.logo}>
        <Link href="/">
          <a>
            <Image src={Logo} alt="logo" />
          </a>
        </Link>
      </div>

      <Row>
        <Col md={5}>
          <Image src={HeadImage} alt="head-image" className={style.headImage} />
        </Col>
        <Col md={7} className={style.form}>
          <div className="text-center">
            <Button
              variant="link"
              className="font-weight-bold"
              //   onClick={onSignInGoogle}
              style={{
                border: '1px solid #DDE2E5',
                color: '#212429',
                borderRadius: 15,
                padding: '12px 24px',
              }}
            >
              <img src={GoogleLogo} className="mr-2" alt="" />
              GOOGLE
            </Button>
            <div
              style={{
                position: 'relative',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                  backgroundColor: '#ffffff',
                  zIndex: 99,
                  position: 'relative',
                }}
              >
                {t('or')}
              </span>
              <hr
                style={{
                  width: '80%',
                  position: 'absolute',
                  top: -3,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                }}
              />
            </div>
          </div>
          <div>
            <Form id="signin-form">
              <Form.Group className={style.inputGroup}>
                <Form.Control
                  placeholder={t('Email')}
                  type="email"
                  className={style.input}
                  //   value={formData.email}
                  //   isInvalid={errorEmail.state}
                  //   onChange={handleChange('email')}
                  required
                />
                <FormControl.Feedback type="invalid">
                  {/* {errorEmail.state && t(errorEmail.message)} */}
                </FormControl.Feedback>
              </Form.Group>
              <Form.Group
                className={style.inputGroup}
                style={{
                  position: 'relative',
                  // marginBottom: '0.7rem',
                  // width: '80%',
                  // margin: '0 auto',
                }}
              >
                <Form.Control
                  placeholder={t('Password')}
                  className={style.input}
                  //   value={formData.name}
                  //   isInvalid={errorName.state}
                  //   onChange={handleChange('name')}
                  type="text"
                  required
                />
                <Button
                  variant="link"
                  onClick={() => setShowPasswd(!showPasswd)}
                  style={{
                    position: 'absolute',
                    right: 50,
                    top: showPasswd ? 0 : 5,
                  }}
                >
                  {showPasswd ? (
                    <Eye className="mt-2" style={{ color: '#EC8897' }} />
                  ) : (
                    <EyeOff lassName="mt-2" style={{ color: '#EC8897' }} />
                  )}
                </Button>

                <FormControl.Feedback type="invalid">
                  {/* {errorName.state && t(errorName.message)} */}
                </FormControl.Feedback>
              </Form.Group>
            </Form>
          </div>
          <div
            className="d-flex mt-3"
            style={{ marginTop: 6, width: '80%', margin: '0 auto' }}
          >
            <div>
              <Form.Check
                inline
                type="checkbox"
                id="remember-me-checkbox"
                label={t('Remember me')}
                // value={formData.rememberMe}
                // onChange={handleChange('rememberMe')}
                custom
              />
            </div>
            <div className="ml-auto">
              <Link href="/find-password" passHref>
                <a>{t('Forgot password?')}</a>
              </Link>
            </div>
          </div>
          <p className="text-center mt-3">
            {t("Don't have account?")}{' '}
            <Link href="/sign-up">
              <a>{t('Sign up')}</a>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInComponent;
