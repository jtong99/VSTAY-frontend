import React, { useState } from 'react';
import {
  Button,
  Image,
  Container,
  Form,
  FormControl,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useTranslation } from 'i18n';
import ButtonDirect from '../ButtonDirect';

function PropertyPreference({ currentData, upStep, downStep, onFinishRoom }) {
  const { t } = useTranslation(['topnav']);
  const [roomData, setRoomData] = useState({
    furnishing: (currentData.detail && currentData.detail.furnishing) ?? '',
    toilets: (currentData.detail && currentData.detail.toilets) ?? '',
    internet: (currentData.detail && currentData.detail.internet) ?? '',
    max_people_live_with:
      (currentData.detail && currentData.detail.max_people_live_with) ??
      'Select max people live with',
  });
  const selectFurnish = [
    { text: 'Flexible', val: 'flexible' },
    { text: 'Required', val: 'required' },
    { text: 'Not Required', val: 'not_required' },
  ];
  const selectInternet = [
    { text: 'Flexible', val: 'flexible' },
    { text: 'Required', val: 'required' },
  ];
  const selectToilet = [
    { text: 'Flexible', val: 'flexible' },
    { text: 'Owned', val: 'required' },
  ];
  const maxPeopleLive = [0, 1, 2, 3, 4, 5];
  const handleChangeFurnish = (val) => setRoomData({ ...roomData, furnishing: val });
  const handleChangeToilet = (val) => setRoomData({ ...roomData, toilets: val });
  const handleChangeInternet = (val) => setRoomData({ ...roomData, internet: val });
  const onFinish = () => {
    if (onFinishRoom)
      onFinishRoom({
        ...currentData,
        detail: {
          ...currentData.detail,
          max_people_live_with: parseInt(roomData.max_people_live_with),
          toilets: roomData.toilets,
          furnishing: roomData.furnishing,
          internet: roomData.internet,
        },
      });
    if (upStep) upStep();
  };
  const isEmpty = () => {
    return (
      roomData.furnishing === '' ||
      roomData.toilets === '' ||
      roomData.internet === '' ||
      roomData.max_people_live_with === ''
    );
  };
  return (
    <Container className="pt-5 pb-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('YOUR IDEAL PLACE')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Property preferences')}</h3>
      </div>
      <Form style={{ width: '55%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Room Furnishing')}</Form.Label>

          <div>
            {selectFurnish.map((b) => (
              <Button
                variant="whiter"
                className={`border-dark ${
                  roomData.furnishing === b.val ? 'bg-black-blue' : ''
                }`}
                onClick={() => handleChangeFurnish(b.val)}
                style={{
                  padding: '15px 60px 15px 60px',
                  borderRadius: 'initial',
                  color: roomData.furnishing === b.val ? '#ffffff' : '#000000',
                  fontWeight: 600,
                }}
              >
                {b.text}
              </Button>
            ))}
          </div>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Internet')}</Form.Label>

          <div>
            {selectInternet.map((b) => (
              <Button
                variant="whiter"
                className={`border-dark ${
                  roomData.internet === b.val ? 'bg-black-blue' : ''
                }`}
                onClick={() => handleChangeInternet(b.val)}
                style={{
                  padding: '15px 116px 15px 116px',
                  borderRadius: 'initial',
                  color: roomData.internet === b.val ? '#ffffff' : '#000000',
                  fontWeight: 600,
                  width: 300,
                }}
              >
                {b.text}
              </Button>
            ))}
          </div>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group style={{ width: '100%' }}>
          <Form.Label style={{ fontWeight: 600 }}>{t('Toilets')}</Form.Label>

          <div>
            {selectToilet.map((b) => (
              <Button
                variant="whiter"
                className={`border-dark ${
                  roomData.toilets === b.val ? 'bg-black-blue' : ''
                }`}
                onClick={() => handleChangeToilet(b.val)}
                style={{
                  padding: '15px 116px 15px 116px',
                  borderRadius: 'initial',
                  color: roomData.toilets === b.val ? '#ffffff' : '#000000',
                  fontWeight: 600,
                  width: 300,
                }}
              >
                {b.text}
              </Button>
            ))}
          </div>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>
            {t('Do you have any roomate?')}
          </Form.Label>

          <Form.Control
            as="select"
            className="pr-3"
            value={roomData.max_people_live_with}
            onChange={(e) =>
              setRoomData({ ...roomData, max_people_live_with: e.target.value })
            }
          >
            <option
              value="Select max people live with"
              style={{ fontWeight: 600 }}
              selected
              disabled
            >
              {t('Select max people live with')}
            </option>
            {maxPeopleLive.map((m) => (
              <option value={m}>{m === 5 ? '5+' : m}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      <ButtonDirect
        currentStep={3}
        downStep={downStep}
        onFinishStep={onFinish}
        disableValue={isEmpty()}
      />
    </Container>
  );
}

export default PropertyPreference;
