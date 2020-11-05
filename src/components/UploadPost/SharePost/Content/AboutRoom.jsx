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
import MapModal from '@components/Map/MapModalSelectAddress';
import { Parking, Bills } from '@helper/enum';
import ButtonDirect from '../ButtonDirect';
import { enumToArray } from 'helper';
import { RoomFurnishing, RoomToilet } from '@helper/enum';

function AboutRoom({ currentData, upStep, downStep, onFinishRoom }) {
  const { t } = useTranslation(['topnav']);
  const arrayNum = enumToArray(RoomFurnishing);
  const furnishSelect = [
    { text: 'Flexible', val: RoomFurnishing.FLEXIBLE },
    { text: 'Furnish', val: RoomFurnishing.FURNISHED },
  ];
  const toiletSelect = [
    { text: 'Shared', val: RoomToilet.SHARED },
    { text: 'Owned', val: RoomToilet.OWNED },
  ];
  const maxPeopleLive = [1, 2, 3, 4, 5];
  const [roomData, setRoomData] = useState({
    furnishing: (currentData.detail && currentData.detail.furnishing) ?? '',
    toilets: (currentData.detail && currentData.detail.toilets) ?? '',
    max_people_live_with:
      (currentData.detail && currentData.detail.max_people_live_with) ?? '',
  });
  const handleChangeFurnish = (val) => setRoomData({ ...roomData, furnishing: val });
  const handleChangeToilet = (val) => setRoomData({ ...roomData, toilets: val });
  const isEmpty = () => {
    return (
      roomData.furnishing === '' &&
      roomData.toilets === '' &&
      roomData.max_people_live_with === ''
    );
  };
  const onFinish = () => {
    if (onFinishRoom)
      onFinishRoom({
        ...currentData,
        detail: {
          ...currentData.detail,
          max_people_live_with: roomData.max_people_live_with,
          toilets: roomData.toilets,
          furnishing: roomData.furnishing,
        },
      });
    if (upStep) upStep();
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('Introduce your bed room(s)')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('About your bed room(s)')}</h3>
      </div>
      <Form style={{ width: '35%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Room Furnishing')}</Form.Label>

          <div>
            {furnishSelect.map((b) => (
              <Button
                variant="whiter"
                className={`border-dark ${
                  roomData.furnishing === b.val ? 'bg-black-blue' : ''
                }`}
                onClick={() => handleChangeFurnish(b.val)}
                style={{
                  padding: '15px 66px 15px 66px',
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
          <Form.Label style={{ fontWeight: 600 }}>{t('Toilets')}</Form.Label>

          <div>
            {toiletSelect.map((b) => (
              <Button
                variant="whiter"
                className={`border-dark ${
                  roomData.toilets === b.val ? 'bg-black-blue' : ''
                }`}
                onClick={() => handleChangeToilet(b.val)}
                style={{
                  padding: '15px 68px 15px 68px',
                  borderRadius: 'initial',
                  color: roomData.toilets === b.val ? '#ffffff' : '#000000',
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
            {maxPeopleLive.map((m) => (
              <option value={m}>{m === 5 ? '5+' : m}</option>
            ))}
          </Form.Control>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
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

export default AboutRoom;
