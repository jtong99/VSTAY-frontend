import React, { useState, useEffect, useContext } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Alert,
  Button,
  Spinner,
} from 'react-bootstrap';
import useFetch from 'hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';
import InputAddSNS from './InputAddSNS';
import useCurrentUser from '@hooks/api/useCurrentUserData';
import { Check } from 'react-feather';
import { useTranslation } from 'i18n';

const updatePath = '/v1/api/user/me/profile';
function FormEditProfile({
  // handleCloseModal,
  // handleCloseModalEdit,
  // setTrue,
  // setFalse,
  // handleSetLoading,
  // handleSuccess,
  handleClose,
  success = false,
}) {
  const { t } = useTranslation(['profile', 'common']);
  const { getToken } = useContext(AuthContext);
  const [updateProfile, { loading }] = useFetch(updatePath, {
    token: getToken(),
    method: 'PATCH',
  });

  const { data: userData, revalidate: onCompleted } = useCurrentUser();
  const user = userData && userData.user ? userData.user : {};
  // const [success, setSuccess] = useState(false);
  // const handleSuccess = () => {
  //   setSuccess(true);
  //   setTimeout(() => {
  //     setSuccess(false);
  //   }, 2500);
  // };
  // const inputFile = useRef(null);
  // const onButtonClick = () => {
  //   inputFile.current.click();
  // };
  const getInitialSNStoInput = (sns) => {
    const linkSNS = [];
    if (sns) {
      Object.keys(sns).map((key) => {
        if (sns[key] !== '') {
          linkSNS.push({ type: key, input: sns[key] });
        }
        return null;
      });
    }
    return linkSNS;
  };
  const [isChangeSNS, setIsChangeSNS] = useState(false);
  const setChangeSNSTrue = () => setIsChangeSNS(true);
  const setChangeSNSFalse = () => setIsChangeSNS(false);

  const [valSNS, setValSNS] = useState(getInitialSNStoInput(user && user.social));
  const handleChangeSNS = (sns) => setValSNS(sns);

  const [form, setForm] = useState({
    // avatar: user && user.avatar,
    about: user && user.about,
    headline: user && user.headline ? user.headline : '',
    language: user && user.language ? user.language : '',
    // youtube: user && user.social && user.social.youtube ? user.social.youtube : '',
    // linkedin:
    //   user && user.social && user.social.linkedin ? user.social.linkedin : '',
    // facebook:
    //   user && user.social && user.social.facebook ? user.social.facebook : '',
  });

  const isSNSempty = () => {
    return (
      user &&
      user.social &&
      user.social.youtube === '' &&
      user.social.facebook === '' &&
      user.social.instagram === '' &&
      user.social.linkedin === ''
    );
  };
  const [showSNS, setShowSNS] = useState({
    displayPart: !isSNSempty(),
    editPart: false,
  });
  const handleChangeShowSNS = (show) => setShowSNS(show);
  // const discardChange = () => {
  //   handleSetLoading(false);
  //   setForm({
  //     // avatar: user && user.avatar,
  //     about: user && user.about,
  //     headline: user && user.headline ? user.headline : '',
  //     language: user && user.language ? user.language : '',
  //   });
  //   setValSNS([]);
  //   setFalse();
  //   handleCloseModalEdit();
  // };
  const [isChange, setIsChange] = useState({
    headline: false,
    language: false,
    about: false,
  });

  // useEffect(() => {
  //   handleSetLoading(loading);
  //   if (isChange.headline || isChange.about || isChange.language || isChangeSNS) {
  //     setTrue();
  //   } else {
  //     setFalse();
  //   }
  // }, [isChange, setFalse, setTrue, isChangeSNS, loading, handleSetLoading]);
  const handleChangeForm = (field) => (e) => {
    if (field === 'headline') {
      if (user && user.headline === e.target.value) {
        setIsChange({ ...isChange, headline: false });
      } else {
        setIsChange({ ...isChange, headline: true });
      }
    }
    if (field === 'about') {
      if (user && user.about === e.target.value) {
        setIsChange({ ...isChange, about: false });
      } else {
        setIsChange({ ...isChange, about: true });
      }
    }
    if (field === 'language') {
      if (user && user.language === e.target.value) {
        setIsChange({ ...isChange, about: false });
      } else {
        setIsChange({ ...isChange, about: true });
      }
    }
    setForm({ ...form, [field]: e.target.value });
  };

  const [errorHeadline, setErrorHeadline] = useState({ state: false, message: '' });
  const [errorAbout, setErrorAbout] = useState({ state: false, message: '' });
  const [errorFb, setErrorFb] = useState({ state: false, message: '' });
  const [errorYt, setErrorYt] = useState({ state: false, message: '' });
  const [errorLd, setErrorLd] = useState({ state: false, message: '' });
  const [errorIg, setErrorIg] = useState({ state: false, message: '' });
  const [errorSelect, setErrorSelect] = useState({
    index: null,
    state: false,
    message: '',
  });

  const setErrorNull = () => {
    setErrorHeadline({ state: false, message: '' });
    setErrorAbout({ state: false, message: '' });
    setErrorFb({ state: false, message: '' });
    setErrorYt({ state: false, message: '' });
    setErrorLd({ state: false, message: '' });
    setErrorIg({ state: false, message: '' });
    setErrorSelect({ index: null, state: false, message: '' });
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    setErrorNull();
    for (let i = 0; i < valSNS.length; i += 1) {
      if (valSNS[i].type === '') {
        setErrorSelect({
          index: i,
          state: true,
          message: t('Select type of SNS'),
        });
        return null;
      }
    }
    valSNS.map((e, index) => {
      if (e.input === '') {
        setValSNS([
          ...valSNS.slice(0, index),
          ...valSNS.slice(index + 1, valSNS.length),
        ]);
      }
      return null;
    });
    const formData = new FormData();
    Object.keys(form).map((key) => formData.append(key, form[key]));
    formData.append(
      'facebook',
      valSNS.filter((element) =>
        Object.keys(element).some((k) => element[k] === 'facebook'),
      )[0]
        ? valSNS.filter((element) =>
            Object.keys(element).some((k) => element[k] === 'facebook'),
          )[0].input
        : '',
    );
    formData.append(
      'linkedin',
      valSNS.filter((element) =>
        Object.keys(element).some((k) => element[k] === 'linkedin'),
      )[0]
        ? valSNS.filter((element) =>
            Object.keys(element).some((k) => element[k] === 'linkedin'),
          )[0].input
        : '',
    );
    formData.append(
      'youtube',
      valSNS.filter((element) =>
        Object.keys(element).some((k) => element[k] === 'youtube'),
      )[0]
        ? valSNS.filter((element) =>
            Object.keys(element).some((k) => element[k] === 'youtube'),
          )[0].input
        : '',
    );

    formData.append(
      'instagram',
      valSNS.filter((element) =>
        Object.keys(element).some((k) => element[k] === 'instagram'),
      )[0]
        ? valSNS.filter((element) =>
            Object.keys(element).some((k) => element[k] === 'instagram'),
          )[0].input
        : '',
    );

    const { data: res, error: err } = await updateProfile({
      ...form,
      facebook: valSNS.filter((element) =>
        Object.keys(element).some((k) => element[k] === 'facebook'),
      )[0]
        ? valSNS.filter((element) =>
            Object.keys(element).some((k) => element[k] === 'facebook'),
          )[0].input
        : '',
      instagram: valSNS.filter((element) =>
        Object.keys(element).some((k) => element[k] === 'instagram'),
      )[0]
        ? valSNS.filter((element) =>
            Object.keys(element).some((k) => element[k] === 'instagram'),
          )[0].input
        : '',
      twitter: valSNS.filter((element) =>
        Object.keys(element).some((k) => element[k] === 'youtube'),
      )[0]
        ? valSNS.filter((element) =>
            Object.keys(element).some((k) => element[k] === 'youtube'),
          )[0].input
        : '',
    });

    if (!err && res && res.code === 200) {
      setIsChangeSNS(false);
      if (onCompleted) onCompleted();
      setIsChange({
        headline: false,
        language: false,
        about: false,
      });
      setShowSNS({
        displayPart: true,
        editPart: false,
      });
      // handleSuccess();
      // setFalse();
      setTimeout(() => {
        handleClose();
      }, 500);
    } else if (err && err.errors) {
      err.errors.map((e) => {
        if (e.field === 'headline') {
          setErrorHeadline({ state: true, message: e.message });
        }
        if (e.field === 'about') {
          setErrorAbout({ state: true, message: e.message });
        }
        if (e.field === 'facebook') {
          setErrorFb({ state: true, message: e.message });
        }
        if (e.field === 'linkedin') {
          setErrorLd({ state: true, message: e.message });
        }
        if (e.field === 'youtube') {
          setErrorYt({ state: true, message: e.message });
        }
        if (e.field === 'instagram') {
          setErrorIg({ state: true, message: e.message });
        }
        return null;
      });
    } else {
      // console.log(err);
    }
    return null;
  };

  return (
    <>
      {/* <button onClick={() => console.log(form)}>click</button> */}
      <Form id="EditProfileForm" onSubmit={handleUpdate}>
        {success && (
          <Alert variant="success">
            <strong>{t('Success')}!</strong> {t('success-update-profile')}!
          </Alert>
        )}
        <FormGroup>
          <Form.Label>{t('Headline')}</Form.Label>
          <Form.Control
            type="text"
            value={form.headline}
            onChange={handleChangeForm('headline')}
            isInvalid={errorHeadline.state}
          />
          {errorHeadline.state && (
            <FormControl.Feedback type="invalid">
              {t(errorHeadline.message)}
            </FormControl.Feedback>
          )}
        </FormGroup>

        <FormGroup>
          <Form.Label>{t('About')}</Form.Label>
          <Form.Control
            value={form.about}
            onChange={handleChangeForm('about')}
            as="textarea"
            isInvalid={errorAbout.state}
          />

          <FormControl.Feedback type="invalid">
            {errorAbout.state && t(errorAbout.message)}
          </FormControl.Feedback>
        </FormGroup>

        <FormGroup>
          <Form.Label>{t('Social network')}</Form.Label>
          <InputAddSNS
            initialSNS={user.social}
            isEmpty={isSNSempty}
            setChangeTrue={setChangeSNSTrue}
            setChangeFalse={setChangeSNSFalse}
            // handleSetLoading={handleSetLoading}
            valSNS={valSNS}
            setValSNS={handleChangeSNS}
            showSNS={showSNS}
            setShowSNS={handleChangeShowSNS}
            errorFb={errorFb}
            errorYt={errorYt}
            errorLd={errorLd}
            errorSelect={errorSelect}
          />
        </FormGroup>
        <div className="d-flex flex-row-reverse">
          <Button
            variant={success ? 'success' : 'primary'}
            type="submit"
            disabled={loading || success}
            style={{
              width: '145px',
              height: '40px',
            }}
          >
            {loading && <Spinner animation="border" size="sm" />}
            {success && <Check />}
            {!loading && !success && t('Save Change')}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default FormEditProfile;
