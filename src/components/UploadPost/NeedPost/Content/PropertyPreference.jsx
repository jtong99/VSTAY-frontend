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
import { enumToArray } from 'helper';
import { RoomFurnishingNeed, RoomToilet } from '@helper/enum';

function PropertyPreference({ currentData, upStep, downStep, onFinishRoom }) {
  const { t } = useTranslation(['topnav']);
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
  const maxPeopleLive = [1, 2, 3, 4, 5];
  const [roomData, setRoomData] = useState({
    furnishing: (currentData.detail && currentData.detail.furnishing) ?? '',
  });
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
                  roomData.furnishing === b.val ? 'bg-black-blue' : ''
                }`}
                onClick={() => handleChangeFurnish(b.val)}
                style={{
                  padding: '15px 116px 15px 116px',
                  borderRadius: 'initial',
                  color: roomData.furnishing === b.val ? '#ffffff' : '#000000',
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
                  roomData.furnishing === b.val ? 'bg-black-blue' : ''
                }`}
                onClick={() => handleChangeFurnish(b.val)}
                style={{
                  padding: '15px 116px 15px 116px',
                  borderRadius: 'initial',
                  color: roomData.furnishing === b.val ? '#ffffff' : '#000000',
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
            {t('Max people live with')}
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
    </Container>
  );
}

export default PropertyPreference;
