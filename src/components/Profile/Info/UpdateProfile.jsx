import React from 'react';
import { Button, Modal, Spinner, Collapse } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import FormUpdate from './FormEditProfile';

function UpdateProfile({ show, handleClose }) {
  const { t } = useTranslation(['profile']);
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
          <FormUpdate handleClose={handleClose} />
        </Modal.Body>

        {/* <Modal.Footer>
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
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default UpdateProfile;
