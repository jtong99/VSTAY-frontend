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
import SubImage from './img/SignUp-1.svg';
import style from './SignUp.module.scss';
import Link from 'next/link';
import { Eye, EyeOff } from 'react-feather';
import { useTranslation } from 'i18n';
import useFetch from '@hooks/useFetch';

const signUpPath = '/v1/auth/signup/prod/verify';
function SignUpComponent() {
  const { t } = useTranslation(['signup']);
  const [signUp, { loading }] = useFetch(signUpPath);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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
    const { data: res, error: err } = await signUp(formData);
    console.log(res);
  };
  return (
    <Container>
      <div className={style.logo}>
        <Link href="/">
          <a>
            <Image src={Logo} alt="logo" />
          </a>
        </Link>
      </div>
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
                </Form>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <Link href="/sign-in">
                    <a>{t('Login now')}</a>
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
