import React, { useState, useRef, forwardRef, createRef } from 'react';
import { Button, Image, Container, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import ButtonDirect from '../ButtonDirect';
import DatePicker from 'react-datepicker';
import { DateFormat, toUnixTimeStamp } from '@helper/format';
import { LengthOfStay } from '@helper/enum';
import { enumToArray } from 'helper';

function RoomAvailability({
  onFinishRoomAvailability,
  currentData,
  upStep,
  downStep,
}) {
  const { t } = useTranslation(['topnav']);
  const [date, setDate] = useState(
    (currentData.detail &&
      currentData.detail.room_availability &&
      currentData.detail.room_availability.date_availability) ??
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  );
  const lengthStay = enumToArray(LengthOfStay);
  const [stayAvailable, setStayAvailable] = useState({
    max:
      (currentData.detail &&
        currentData.detail.room_availability &&
        currentData.detail.room_availability.max_length_of_stay) ??
      '',
    min:
      (currentData.detail &&
        currentData.detail.room_availability &&
        currentData.detail.room_availability.min_length_of_stay) ??
      '',
  });
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
      <DatePicker
        ref={ref}
        selected={date}
        onChange={(date) => {
          setDate(date);
        }}
        minDate={new Date()}
        customInput={<ExampleCustomInput />}
        dateFormat="MMMM d, yyyy"
      />
    );
  };
  const onFinish = () => {
    if (onFinishRoomAvailability)
      onFinishRoomAvailability({
        ...currentData,
        detail: {
          ...currentData.detail,
          room_availability: {
            min_length_of_stay: parseInt(stayAvailable.min),
            max_length_of_stay: parseInt(stayAvailable.max),
            date_availability: toUnixTimeStamp(date),
          },
        },
      });
    if (upStep) upStep();
  };
  return (
    <Container className="pt-5">
      {/* <button onClick={() => console.log(currentData)}>click</button> */}
      <div className="p-3">
        <h4 className="text-secondary">{t('Introduce your place')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Room avaibility')}</h3>
      </div>

      <Form style={{ width: '35%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>
            {t('When it is available?')}
          </Form.Label>

          <div>{datePicker()}</div>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>
            {t('Minimum length of stay')}
          </Form.Label>
          <Form.Control
            as="select"
            className="pr-3 border-dark"
            value={stayAvailable.min}
            onChange={(e) =>
              setStayAvailable({ ...stayAvailable, min: e.target.value })
            }
          >
            {lengthStay.map((l) => (
              <option
                value={l}
                key={l}
                disabled={stayAvailable.max !== '' && l > stayAvailable.max}
              >
                {l === -1 ? 'Unlimited' : `${l} month${l > 1 ? 's' : ''}`}
              </option>
            ))}
          </Form.Control>
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>
            {t('Maximum length of stay')}
          </Form.Label>
          <Form.Control
            as="select"
            className="pr-3 border-dark"
            value={stayAvailable.max}
            onChange={(e) =>
              setStayAvailable({ ...stayAvailable, max: e.target.value })
            }
          >
            {lengthStay.map((l) => (
              <option
                value={l}
                disabled={stayAvailable.min !== '' && l < stayAvailable.min}
              >
                {l === -1 ? 'Unlimited' : `${l} month${l > 1 ? 's' : ''}`}
              </option>
            ))}
          </Form.Control>
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
      </Form>
      <ButtonDirect
        currentStep={4}
        downStep={downStep}
        onFinishStep={onFinish}
        disableValue={false}
      />
      {/* <div>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div> */}
    </Container>
  );
}

export default RoomAvailability;
