import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import useFetch from 'hooks/useFetch';
import { removeRefreshToken, fetchLogout } from 'helper/auth';
import AuthContext from '@components/Auth/AuthContext';
import { useTranslation } from 'i18n';

const changPwdPath = '/v1/api/user/me/password';

function FormChangePwd({ setSuccessTrue, handleClose }) {
  const { t } = useTranslation(['profile']);
  const { getToken } = useContext(AuthContext);
  const [fireChangePass, { loading }] = useFetch(changPwdPath, {
    token: getToken(),
    method: 'PATCH',
  });
  const router = useRouter();
  const [formPwd, setFormPwd] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errorCurrentPwd, setErrorCurrentPwd] = useState({
    state: false,
    message: '',
  });
  const [errorNewPwd, setErrorNewPwd] = useState({
    state: false,
    message: '',
  });
  const [errorConfirmPwd, setErrorConfirmPwd] = useState({
    state: false,
    message: '',
  });
  const [isChange, setIsChange] = useState({
    curPwd: false,
    newPwd: false,
    conPwd: false,
  });
  const handlechangeForm = (field) => (event) => {
    if (field === 'currentPassword') {
      if (event.target.value === '') {
        setIsChange({ ...isChange, curPwd: false });
      } else {
        setIsChange({ ...isChange, curPwd: true });
      }
    }
    if (field === 'newPassword') {
      if (event.target.value === '') {
        setIsChange({ ...isChange, newPwd: false });
      } else {
        setIsChange({ ...isChange, newPwd: true });
      }
    }
    if (field === 'confirmPassword') {
      if (event.target.value === '') {
        setIsChange({ ...isChange, conPwd: false });
      } else {
        setIsChange({ ...isChange, conPwd: true });
      }
    }
    setFormPwd({ ...formPwd, [field]: event.target.value });
  };
  const setErrorNull = () => {
    setErrorCurrentPwd({
      state: false,
      message: '',
    });
    setErrorNewPwd({
      state: false,
      message: '',
    });
    setErrorConfirmPwd({
      state: false,
      message: '',
    });
  };
  const handleChangePwd = async (e) => {
    e.preventDefault();
    const { data: res, error: err } = await fireChangePass(formPwd);
    // console.log(token);
    if (!err && res && res.code === 200) {
      setSuccessTrue();
      removeRefreshToken();
      setTimeout(() => {
        if (fetchLogout(getToken())) {
          router.push('/sign-in');
        }
      }, 5000);
      // const data = await serverFetcher('/v1/auth/signout', { token });
      // if (data && data.code === 200) {
      //   setSuccessTrue();
      //   removeToken();
      //   setTimeout(() => {
      //     router.push('/login');
      //   }, 5000);
      // } else {
      //   handleSetError();
      // }

      // router.push('/change-password/success');
    } else {
      // console.log(err);
      setErrorNull();
      if (err && err.errors && err.errors.length > 0) {
        for (let i = 0; i < err.errors.length; i += 1) {
          if (err.errors[i].field === 'currentPassword') {
            setErrorCurrentPwd({
              state: true,
              message: err.errors[i].message,
            });
          }
          if (err.errors[i].field === 'newPassword') {
            setErrorNewPwd({
              state: true,
              message: err.errors[i].message,
            });
          }
          if (err.errors[i].field === 'confirmPassword') {
            setErrorConfirmPwd({
              state: true,
              message: err.errors[i].message,
            });
          }
        }
      } else if (err && err.message && err.message.includes('Current password')) {
        setErrorCurrentPwd({
          state: true,
          message: err.message,
        });
        setErrorNewPwd({
          state: false,
          message: '',
        });
        setErrorConfirmPwd({
          state: false,
          message: '',
        });
      } else if (err && err.message && err.message.includes('New password')) {
        setErrorNewPwd({
          state: true,
          message: err.message,
        });
        setErrorCurrentPwd({
          state: false,
          message: '',
        });
        setErrorConfirmPwd({
          state: false,
          message: '',
        });
      } else if (
        err &&
        err.message &&
        err.message.includes('Confirm new password')
      ) {
        setErrorConfirmPwd({
          state: true,
          message: err.message,
        });
        setErrorCurrentPwd({
          state: false,
          message: '',
        });
        setErrorNewPwd({
          state: false,
          message: '',
        });
      }
    }
  };
  return (
    <Form id="changePwdForm" onSubmit={handleChangePwd}>
      <FormGroup>
        <Form.Label>
          {t('Old Password')}&nbsp;<span className="red_dot">*</span>
        </Form.Label>
        <Form.Control
          required
          type="password"
          value={formPwd.currentPassword}
          onChange={handlechangeForm('currentPassword')}
          isInvalid={errorCurrentPwd.state}
        />
        <FormControl.Feedback type="invalid">
          {errorCurrentPwd.state && t(errorCurrentPwd.message)}
        </FormControl.Feedback>
      </FormGroup>
      <FormGroup>
        <Form.Label>
          {t('New Password')}&nbsp;<span className="red_dot">*</span>
        </Form.Label>
        <Form.Control
          required
          type="password"
          value={formPwd.newPassword}
          onChange={handlechangeForm('newPassword')}
          isInvalid={errorNewPwd.state}
        />
        <FormControl.Feedback type="invalid">
          {errorNewPwd.state && t(errorNewPwd.message)}
        </FormControl.Feedback>
      </FormGroup>

      <FormGroup>
        <Form.Label>
          {t('Confirm New Password')}&nbsp;<span className="red_dot">*</span>
        </Form.Label>
        <Form.Control
          required
          type="password"
          value={formPwd.confirmPassword}
          onChange={handlechangeForm('confirmPassword')}
          isInvalid={errorConfirmPwd.state}
        />
        <FormControl.Feedback type="invalid">
          {errorConfirmPwd.state && t(errorConfirmPwd.message)}
        </FormControl.Feedback>
      </FormGroup>
    </Form>
  );
}

export default FormChangePwd;
