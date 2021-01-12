import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import useFetch from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';
import { useRouter } from 'next/router';
import useSendMessage from '@hooks/useSendMessage';

const path = '/v1/api/post/status';
function RejectDialog({ id, status, open, onClose, decision, posterID }) {
  const [sendMessage] = useSendMessage({
    peerId: posterID,
    message: `ADMIN NOTIFICATION: Your post is ${decision}, please check it on your profile page. Feel free to send me message!`,
  });
  const router = useRouter();
  const { t } = useTranslation(['topnav']);
  const { getToken } = useContext(AuthContext);
  const [fire, { loading }] = useFetch(path, {
    token: getToken(),
    method: 'PATCH',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await fire({
      postID: id,
      status: decision,
    });
    if (data && data.code === 200) {
      sendMessage();
      onClose();
      router.push('/admin');
    }
  };
  return (
    <Modal
      show={open}
      onHide={onClose}
      // className={confirmDialog ? 'dc-form-show-discard' : null}
    >
      <Modal.Header closeButton>
        <Modal.Title> {status === 'approved' ? 'Approved' : 'Rejected'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          {t(`Are you sure to`)}{' '}
          <span className="font-weight-600">
            {status === 'approved' ? 'approved' : 'rejected'}
          </span>{' '}
          this post?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={onClose}
          variant="secondary"
          style={{ borderRadius: 12 }}
          disabled={loading}
        >
          {t('Cancel')}
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          style={{ borderRadius: 12 }}
          disabled={loading}
        >
          {t('Submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectDialog;
