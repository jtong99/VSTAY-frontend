import React, { useState, useContext } from 'react';
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
import { useRouter } from 'next/router';
import AuthContext from 'components/Auth/AuthContext';
import useFetch from 'hooks/useFetch';
import Loading from '@components/utils/Loading';
import firebase from '@helper/firebase';
import 'firebase/auth';

const signInPath = '/v1/auth/signin';

function SignInComponent() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [showPasswd, setShowPasswd] = useState(false);
  const { t } = useTranslation(['signin']);
  const [error, setError] = useState({ state: false, message: '' });
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: router.query.email && router.query.email !== '' ? router.query.email : '',
    password: '',
    rememberMe: false,
  });

  const [startLogin, { loading }] = useFetch(
    `${signInPath}?remember-me=${formData.rememberMe}`,
  );
  const handleLoginWithFirebase = async (form) => {
    const { data, error: err } = await startLogin({ ...form, provider: 'firebase' });
    if (!err && data) {
      const { accessToken, refreshToken, firebaseToken } = data;

      login(accessToken, refreshToken, firebaseToken);

      const { ref } = router.query;
      if (data && data.user && data.user.status && data.user.status === 'blocked') {
        setError({
          state: true,
          message: `You are block, please checkout our policy or contact our customer service to resolve this problem.`,
        });
        return null;
      }
      if (ref) {
        router.push(ref);
      } else {
        router.push('/');
      }
    } else {
      if (err && err.code === 403) {
        setError({
          state: true,
          message: `You are blocked, please checkout our policy or contact our customer service to resolve this problem.`,
        });
        return null;
      }
      if (err.code === 404) {
        router.push(
          `/sign-up?email=${form.email}&token=${form.firebaseToken}&name=${form.name}`,
        );
      }
      setError({
        state: true,
        message: `Wrong email or password.`,
      });
    }
    return null;
  };
  const onSignInGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const { user } = result;
        user
          .getIdToken(true)
          .then(function (idToken) {
            handleLoginWithFirebase({
              email: user.email,
              firebaseToken: idToken,
              name: user.displayName,
              avatar: user.photoURL,
            });
          })
          .catch(function () {
            router.push('/unexpected-error');
            // setError({
            //   state: true,
            //   message: errorToken.message,
            // });
          });
      })
      .catch(function (errGoogle) {
        setError({
          state: true,
          message: errGoogle.message,
        });
        console.log(errGoogle);

        // router.push(`/join?email=${email}`);
      });
  };
  const handleLogin = async (form) => {
    const { data, error: err } = await startLogin(form);
    if (!err && data) {
      const { accessToken, refreshToken, firebaseToken } = data;
      login(accessToken, refreshToken, firebaseToken);
      // console.log('login');
      const { ref } = router.query;
      if (data && data.user && data.user.status && data.user.status === 'blocked') {
        setError({
          state: true,
          message: `You are blocked, please checkout our policy or contact our customer service to resolve this problem.`,
        });
        return null;
      }
      if (ref) {
        setTimeout(() => {
          router.push(ref);
        }, 1000);
      } else {
        router.push('/');
      }
    } else {
      if (err && err.code === 403) {
        setError({
          state: true,
          message: `You are blocked, please checkout our policy or contact our customer service to resolve this problem.`,
        });
        return null;
      }
      setError({
        state: true,
        message: `Wrong email or password.`,
      });
    }
    return null;
  };
  const handleChange = (field) => (event) => {
    if (field === 'rememberMe') {
      // console.log(event.target.checked);
      setFormData({
        ...formData,
        rememberMe: event.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({
      state: false,
      message: '',
    });

    handleLogin(formData);
    return null;
  };
  return (
    <Container>
      <Loading show={loading} />
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
              onClick={onSignInGoogle}
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
            <Form id="signin-form" onSubmit={handleSubmit}>
              <Form.Group className={style.inputGroup}>
                <Form.Control
                  placeholder={t('Email')}
                  type="email"
                  className={style.input}
                  value={formData.email}
                  onChange={handleChange('email')}
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
                  value={formData.password}
                  onChange={handleChange('password')}
                  type={showPasswd ? 'text' : 'password'}
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
                    <EyeOff className="mt-2" style={{ color: '#EC8897' }} />
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
          <div className="text-danger error-message text-center mt-3">
            {error.state && t(error.message)}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              form="signin-form"
              className={style.subminBtn}
            >
              {t('Sign in')}
            </Button>
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
