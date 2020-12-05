import React, { useState } from 'react';
import {
  Container,
  Image,
  Form,
  FormControl,
  Row,
  Col,
  Button,
  Fade,
  Alert,
} from 'react-bootstrap';
import Logo from '@assets/logo/Logo_585x166.svg';
import SubImage from './img/SignUp-1.svg';
import style from './SignUp.module.scss';
import Link from 'next/link';
import { Eye, EyeOff } from 'react-feather';
import { useTranslation, i18n } from 'i18n';
import useFetch from '@hooks/useFetch';
import { useRouter } from 'next/router';
import Loading from '@components/utils/Loading';

const signUpPath = '/v1/auth/signup/prod/verify';
function SignUpComponent() {
  const { t } = useTranslation(['sign-up']);
  const [signUp, { loading }] = useFetch(signUpPath);
  const router = useRouter();
  const { email, name, token } = router.query;
  const [formData, setFormData] = useState(
    name && email && token
      ? {
          name: name || '',
          email: email || '',
          password: '',
          confirmPassword: '',
          language: i18n.language,
          firebaseToken: token || '',
          provider: 'firebase',
        }
      : {
          password: '',
          confirmPassword: '',
          language: i18n.language,
        },
  );
  const [showPwd, setShowPwd] = useState(false);
  const [errorEmail, setErrorEmail] = useState({ state: false, message: '' });
  const [errorName, setErrorName] = useState({ state: false, message: '' });
  const [errorPwd, setErrorPwd] = useState({ state: false, message: '' });
  const [errorConPwd, setErrorConPwd] = useState({ state: false, message: '' });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };
  const setNullError = () => {
    setErrorEmail({ state: false, message: '' });
    setErrorName({ state: false, message: '' });
    setErrorPwd({ state: false, message: '' });
    setErrorConPwd({ state: false, message: '' });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setNullError();
    console.log(formData);
    const { data: res, error: err } = await signUp(formData);
    if (res && (res.code === 200 || res.code === 201)) {
      // if (name && email && token) {
      //   return loginAfterJoin();
      // }
      router.push('/sign-up/success');
    }
    if (err) {
      if (err.code === 400) {
        setErrorName({
          state: true,
          message: err.message,
        });
        return null;
      }
      if (err.code !== 409 && err.code !== 500) {
        for (let i = 0; i < err.errors.length; i += 1) {
          if (err.errors[i].field === 'email') {
            setErrorEmail({ state: true, message: err.errors[i].message });
          }
          if (err.errors[i].field === 'name') {
            setErrorName({ state: true, message: err.errors[i].message });
          }
          if (err.errors[i].field === 'password') {
            setErrorPwd({ state: true, message: err.errors[i].message });
          }
          if (err.errors[i].field === 'confirmPassword') {
            setErrorConPwd({ state: true, message: err.errors[i].message });
          }
        }
      } else if (err.code === 409) {
        if (err.message.includes('name')) {
          setErrorName({ state: true, message: err.message });
        } else if (err.message.includes('email')) {
          setErrorEmail({ state: true, message: err.message });
        }
      } else if (err.code === 500) {
        router.push('/error');
      }
    }
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
      {/* <Fade in={true}>
        <div className="mb-4">
          <Alert
            variant="danger"
            style={{ width: '62%', margin: '0 auto', fontWeight: 600 }}
            // onClose={() => setError(false)}
            dismissible
          >
            this is error
          </Alert>
        </div>
      </Fade> */}
      <div className={style.form}>
        <p className={style.header}>{t('Create your V-account')}</p>

        <Container className="mt-5">
          <Row>
            <Col md={7}>
              <div>
                <Form onSubmit={onSubmit} id="signup-form">
                  <Form.Group>
                    <Form.Control
                      className={style.input}
                      placeholder={t('Email')}
                      type="email"
                      value={formData.email}
                      isInvalid={errorEmail.state}
                      onChange={handleChange('email')}
                      required
                    />
                    <FormControl.Feedback type="invalid">
                      {errorEmail.state && t(errorEmail.message)}
                    </FormControl.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      className={style.input}
                      placeholder={t('Nick name')}
                      value={formData.name}
                      isInvalid={errorName.state}
                      onChange={handleChange('name')}
                      type="text"
                      required
                    />
                    <FormControl.Feedback type="invalid">
                      {errorName.state && t(errorName.message)}
                    </FormControl.Feedback>
                  </Form.Group>
                  <div className="d-flex">
                    <Form.Group>
                      <Form.Control
                        className={style.input}
                        placeholder={t('Password')}
                        type={showPwd ? 'text' : 'password'}
                        value={formData.password}
                        style={errorPwd.state ? { backgroundImage: 'none' } : null}
                        onChange={handleChange('password')}
                        isInvalid={errorPwd.state}
                        required
                      />
                      <FormControl.Feedback type="invalid">
                        {errorPwd.state && t(errorPwd.message)}
                      </FormControl.Feedback>
                    </Form.Group>
                    <Form.Group className="ml-3 mr-3">
                      <Form.Control
                        className={style.input}
                        placeholder={t('Confirm')}
                        type={showPwd ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        style={
                          errorConPwd.state ? { backgroundImage: 'none' } : null
                        }
                        onChange={handleChange('confirmPassword')}
                        isInvalid={errorConPwd.state}
                        required
                      />
                      <FormControl.Feedback type="invalid">
                        {errorConPwd.state && t(errorConPwd.message)}
                      </FormControl.Feedback>
                    </Form.Group>
                    <div>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => setShowPwd(!showPwd)}
                      >
                        {showPwd ? (
                          <Eye className="mt-2" style={{ color: '#EC8897' }} />
                        ) : (
                          <EyeOff className="mt-2" style={{ color: '#EC8897' }} />
                        )}
                      </Button>
                    </div>
                  </div>
                  {/* <div>{errorPwd.state && t(errorPwd.message)}</div> */}
                </Form>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <Link href="/sign-in">
                    <a>{t('Sign In now')}</a>
                  </Link>
                </div>
                <div>
                  <Button
                    variant="primary"
                    type="submit"
                    form="signup-form"
                    className={style.subminBtn}
                  >
                    {t('Sign up')}
                  </Button>
                </div>
              </div>
            </Col>

            <Col md={5}>
              <div className="text-center">
                <Image src={SubImage} alt="sub-image" />
                <p className={style.subText}>
                  {t('With V-stay, you can find the best house for your family.')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}

export default SignUpComponent;
