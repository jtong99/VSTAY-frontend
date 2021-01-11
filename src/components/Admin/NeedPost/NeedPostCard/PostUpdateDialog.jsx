import React, { useState, useContext, forwardRef, createRef } from 'react';
import { Modal, Form, FormGroup, Button, Alert, FormControl } from 'react-bootstrap';
import AuthContext from '@components/Auth/AuthContext';
import useFighter from '@hooks/useFetch';
// import Confirm from '@components/DialogConfirm';
import { useTranslation } from 'i18n';
import { LengthOfStay } from '@helper/enum';
import { enumToArray } from 'helper';
import DatePicker from 'react-datepicker';

function PostUpdateDialog({
  open,
  onClose,
  onCompleted,
  post: {
    _id,
    budget,
    description,
    length_of_stay,
    move_date,
    about: { age, name, gender },
  },
  onOpen,
}) {
  const { t } = useTranslation(['pop-move', 'common']);
  const { getToken } = useContext(AuthContext);
  const lengthStay = enumToArray(LengthOfStay);
  const [postData, setPostData] = useState({
    budget,
    description,
    length_of_stay,
    move_date,
    name,
    age,
    gender,
  });
  const [updatePost, { loading, error }] = useFighter(`/v1/api/need-post/${_id}`, {
    token: getToken(),
    method: 'PATCH',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [date, setDate] = useState('');
  const handleChange = (field) => (event) => {
    const re = /^[0-9\b]+$/;
    if (field === 'budget') {
      if (re.test(event.target.value) || event.target.value === '') {
        return setRentData({
          ...rentData,
          [field]: event.target.value,
        });
      } else {
        return null;
      }
    }
    setPostData({
      ...postData,
      [field]: event.target.value,
    });
  };
  const datePicker = () => {
    const ExampleCustomInput = forwardRef((props, ref) => {
      return (
        <Button
          ref={ref}
          variant="link"
          className="p-0"
          style={{ color: '#000000' }}
          onClick={props.onClick}
        >
          {props.value}
        </Button>
      );
    });
    const ref = createRef();
    return (
      <div
        style={{
          border: '1px solid grey',
          borderRadius: '0.25rem',
          padding: '0.375rem 0.75rem',
          width: '100%',
        }}
      >
        <DatePicker
          ref={ref}
          selected={postData.move_date}
          onChange={(date) => {
            setPostData({ ...postData, move_date: date });
          }}
          // minDate={new Date()}
          customInput={<ExampleCustomInput />}
          dateFormat="MMMM d, yyyy"
        />
      </div>
    );
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
              <Form.Label>{t('Budget')}</Form.Label>
              <Form.Control
                required
                value={postData.budget}
                onChange={handleChange('budget')}
                type="text"
              />
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
            <Form.Group>
              <Form.Label>{t('Length of stay')}</Form.Label>
              <Form.Control
                as="select"
                className="pr-3"
                value={postData.length_of_stay}
                onChange={handleChange('length_of_stay')}
              >
                <option
                  value="Select length stay"
                  style={{ fontWeight: 600 }}
                  selected
                  disabled
                >
                  {t('Select length of stay')}
                </option>
                {lengthStay.map(
                  (l) =>
                    l !== -1 && (
                      <option value={l}>
                        {l === -1 ? 'Unlimited' : `${l} month${l > 1 ? 's' : ''}`}
                      </option>
                    ),
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>{t('Move day')}</Form.Label>

              <div>{datePicker()}</div>
            </Form.Group>
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
