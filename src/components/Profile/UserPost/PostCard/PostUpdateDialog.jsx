import React, { useState, useContext } from 'react';
import { Modal, Form, FormGroup, Button, Alert, FormControl } from 'react-bootstrap';
import AuthContext from '@components/Auth/AuthContext';
import useFighter from '@hooks/useFetch';
// import Confirm from '@components/DialogConfirm';
import { useTranslation } from 'i18n';

function PostUpdateDialog({
  open,
  onClose,
  onCompleted,
  post: { _id, title, description },
  onOpen,
}) {
  const { t } = useTranslation(['pop-move', 'common']);
  const { getToken } = useContext(AuthContext);
  const [postData, setPostData] = useState({
    title,
    description,
  });
  const [updatePost, { loading, error }] = useFighter(`/v1/api/post/${_id}`, {
    token: getToken(),
    method: 'PATCH',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setPostData({
      ...postData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(false);
    const { data } = await updatePost({
      ...postData,
    });
    if (data && data.code === 200) {
      setIsSuccess(true);
      onCompleted();
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div>
      {/* <Confirm
        showModal={confirmDialog}
        handleCloseModal={() => setConfirmDialog(false)}
        discardChange={discard}
      /> */}
      <Modal
        show={open}
        onHide={onClose}
        // className={confirmDialog ? 'dc-form-show-discard' : null}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Update post')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="updatePost" onSubmit={handleSubmit}>
            <FormGroup>
              <Form.Label>{t('Title')}</Form.Label>
              <Form.Control
                required
                value={postData.title}
                onChange={handleChange('title')}
                maxLength="255"
                minLength="30"
                type="text"
              />
              <FormControl.Feedback type="invalid">
                {t('Title is invalid')}
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup>
              <Form.Label>{t('Description')}</Form.Label>
              <Form.Control
                required
                value={postData.description}
                onChange={handleChange('description')}
                minLength="30"
                maxLength="255"
                as="textarea"
                rows={3}
              />
            </FormGroup>
          </Form>
          {error && (
            <Alert variant="danger">
              <strong>{t('Error')}: </strong>
              {error.message}
            </Alert>
          )}
          {isSuccess && <Alert variant="success">{t('Your post is updated')}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onClose}
            variant="secondary"
            style={{ borderRadius: 12 }}
            disabled={loading}
          >
            {isSuccess ? t('Close') : t('Cancel')}
          </Button>
          <Button type="submit" form="updatePost" disabled={loading}>
            {t('Save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostUpdateDialog;
