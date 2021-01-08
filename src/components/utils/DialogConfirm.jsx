import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'i18n';

function DialogConfirm({ showModal, onClose, title, onFire }) {
  const { t } = useTranslation(['discard-change', 'common']);
  return (
    <Modal
      show={showModal}
      onHide={onClose}
      size="sm"
      centered
      // dialogClassName="dc-modal-ifchange"
    >
      <Modal.Header
        style={{ padding: '5px 10px 5px 0px', borderBottom: 'none' }}
        closeButton
      >
        {/* <Modal.Title>Edit Profile</Modal.Title> */}
      </Modal.Header>

      <Modal.Body>
        <p
          className="text-primary font-weight-bold text-center"
          style={{ fontSize: 16 }}
        >
          {t(title)}
        </p>
        <div className="text-center">
          <Button
            variant="outline-primary mr-2"
            style={{ borderRadius: 14 }}
            onClick={onFire}
          >
            {t('Remove')}
          </Button>
          <Button
            className="btn-primary"
            style={{ width: 70, borderRadius: 14 }}
            onClick={onClose}
          >
            {t('Cancel')}
          </Button>
        </div>
      </Modal.Body>

      {/* <Modal.Footer>
                <div>
                    <Button
                        className="dc-btn-discard-change text-primary"
                        onClick={onClose}
                    >
                        {t('common:cancel')}
                    </Button>

                    <Button
                        className="btn-primary"
                        style={{ borderRadius: '3px' }}
                        onClick={handleDiscard}
                    >
                        {t('common:yes')}
                    </Button>
                </div>
            </Modal.Footer> */}
    </Modal>
  );
}

export default DialogConfirm;
