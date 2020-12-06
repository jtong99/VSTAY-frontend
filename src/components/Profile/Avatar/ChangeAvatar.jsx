import React, { useState, useRef, useContext } from 'react';
import { Button, Modal, Spinner, Collapse } from 'react-bootstrap';
import Cropper from 'react-cropper';
import { useTranslation } from 'i18n';
import { CheckCircle } from 'react-feather';
import useFetch from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';
import { mutate } from 'swr';

const path = '/v1/api/user/me/profile/avatar';
function ChangeAvatar({ show, handleClose, handleShow }) {
  const { t } = useTranslation(['profile']);
  const [step, setStep] = useState(1);
  const cropper = useRef(null);
  const imgFile = useRef(null);
  const { getToken } = useContext(AuthContext);
  const [updateAvatar, { loading }] = useFetch(path, {
    token: getToken(),
    method: 'PATCH',
    isJSON: false,
  });
  const [cropImg, setCropImg] = useState({
    source: null,
    cropResult: null,
  });
  const InputFile = (e) => {
    e.preventDefault();

    // setIsChange(true);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCropImg({ ...cropImg, source: reader.result });
    };

    reader.readAsDataURL(files[0]);
  };
  const cropImage = () => {
    if (typeof cropper.current.getCroppedCanvas() === 'undefined') {
      return null;
    }
    setCropImg({
      ...cropImg,
      cropResult: cropper.current.getCroppedCanvas().toDataURL(),
    });
    setStep(step + 1);
    return null;
  };
  const handleUpdateAva = () => {
    const file = imgFile.current.files[0];

    const formData = new FormData();

    cropper.current.getCroppedCanvas().toBlob(async (blob) => {
      const datetime = new Date();
      const filename = datetime.getTime().toString() + imgFile.current.files[0].name;
      // console.log(file.name);
      formData.append('avatar', blob, filename);
      const { data: res, error: err } = await updateAvatar(formData);
      if (!err && res && res.code === 200) {
        // revalidate();
        mutate(['/v1/api/user/me', getToken() || '']);
        // setIsChange(false);
        setStep(step + 1);
        // console.log(res);
      } else {
        console.log(err);
      }
    }, file.type);
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        //   className={dialogDiscard ? 'dc-form-show-discard' : null}
        //   onExit={handleExit}
        centered
      >
        <Modal.Header
          // style={{ padding: '5px 10px 5px 0px', borderBottom: 'none' }}
          closeButton
        >
          <Modal.Title>{t('Change your avatar')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div style={step === 1 ? null : { display: 'none' }}>
            <p className="dc-content-no-center">
              {t('Choose an image to change your avatar')}
            </p>
            <input ref={imgFile} type="file" onChange={InputFile} accept="image/*" />

            <Collapse in={!!cropImg.source} style={{ marginTop: 10 }} mountOnEnter>
              <div>
                <Cropper
                  style={
                    cropImg.source
                      ? {
                          height: 300,
                          width: '100%',
                          margin: '0 auto',
                        }
                      : { display: 'none' }
                  }
                  aspectRatio={1}
                  dragMode="crop"
                  viewMode={2}
                  autoCropArea={1}
                  autoCrop={true}
                  movable={false}
                  preview=".img-preview"
                  guides={false}
                  src={cropImg.source}
                  ref={cropper}
                />
              </div>
            </Collapse>
            {/* {cropImg.source && ()} */}
          </div>
          <Collapse in={step === 2} mountOnEnter>
            <div style={{ textAlign: 'center' }}>
              <img
                className="rounded-circle"
                style={
                  step === 2
                    ? {
                        height: 132,
                        width: 132,
                        // width: '100%',
                      }
                    : { display: 'none' }
                }
                src={cropImg.cropResult}
                alt="cropped"
              />
            </div>
          </Collapse>
          <Collapse in={step === 3} mountOnEnter>
            <div style={step === 3 ? { textAlign: 'center' } : { display: 'none' }}>
              <div>
                <CheckCircle className="text-success" />
              </div>
              <p style={{ marginTop: 10 }}>
                {t('You have just updated your avatar')}
              </p>
            </div>
          </Collapse>
        </Modal.Body>

        <Modal.Footer>
          {step === 1 && (
            <div>
              <Button variant="link" onClick={handleClose}>
                {t('common:cancel')}
              </Button>

              {cropImg.source && (
                <Button variant="primary" onClick={cropImage}>
                  {t('Preview')}
                </Button>
              )}
            </div>
          )}
          {step === 2 && (
            <div>
              <Button variant="link" onClick={() => setStep(step - 1)}>
                {t('common:back')}
              </Button>

              {cropImg.source && (
                <Button
                  variant="primary"
                  onClick={handleUpdateAva}
                  //   disabled={loading}
                  style={{ minWidth: 60 }}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    t('common:save')
                  )}
                </Button>
              )}
            </div>
          )}
          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <Button variant="link" onClick={handleClose}>
                {t('common:ok')}
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChangeAvatar;
