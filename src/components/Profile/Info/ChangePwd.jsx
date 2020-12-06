import React, { useState, useContext } from 'react';
import { Button, Modal, Spinner, Collapse } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import FormChangePwd from './FormChangePwd';
import AuthContext from '@components/Auth/AuthContext';
import { useRouter } from 'next/router';
import Success from './ChangePwdSuccess';

function ChangePwd({ show, handleClose }) {
  const { t } = useTranslation(['profile']);
  const { getToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleSetLoading = (state) => setLoading(state);
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const handleSuccess = async () => {
    setLoading(true);
    if (fetchLogout(getToken())) {
      router.push('/login');
    }
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
          <Modal.Title>{t('Update profile')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {success ? (
            <Success />
          ) : (
            <FormChangePwd
              setSuccessTrue={() => setSuccess(true)}
              handleClose={handleClose}
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          {success ? (
            <Button variant="primary" disabled={loading} onClick={handleSuccess}>
              {loading ? <Spinner animation="border" size="sm" /> : t('Log out now')}
            </Button>
          ) : (
            <Button
              type="submit"
              form="changePwdForm"
              variant="primary"
              disabled={loading}
              style={{ minWidth: '83px' }}
            >
              {loading ? <Spinner animation="border" size="sm" /> : t('Confirm')}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChangePwd;
