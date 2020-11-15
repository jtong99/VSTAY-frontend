import React, { useState, useRef, forwardRef, createRef } from 'react';
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
import { Bills } from '@helper/enum';
import style from './Content.module.scss';
import DatePicker from 'react-datepicker';
import { LengthOfStay } from '@helper/enum';
import { enumToArray } from 'helper';
import ButtonDirect from '../ButtonDirect';
import { DateFormat, toUnixTimeStamp } from '@helper/format';

function RentAndTiming({ currentData, upStep, downStep, onFinishRent }) {
  const { t } = useTranslation(['topnav']);
  const lengthStay = enumToArray(LengthOfStay);
  const [rentData, setRentData] = useState({
    budget: currentData.budget ?? '',
    length_of_stay: currentData.length_of_stay ?? 'Select length stay',
  });
  const [stayAvailable, setStayAvailable] = useState(
    currentData.length_of_stay ?? '',
  );
  const [date, setDate] = useState(
    currentData.move_date ?? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  );

  const isEmpty = () => {
    return (
      rentData.budget === '' || rentData.length_of_stay === 'Select length stay'
    );
  };
  const handleChange = (field) => (event) => {
    const re = /^[0-9\b]+$/;
    if (
      field === 'budget' &&
      (re.test(event.target.value) || event.target.value === '')
    ) {
      return setRentData({
        ...rentData,
        [field]: event.target.value,
      });
    }
    return setRentData({
      ...rentData,
      [field]: event.target.value,
    });
  };
  const onFinish = () => {
    if (onFinishRent)
      onFinishRent({
        ...currentData,
        budget: parseInt(rentData.budget),
        length_of_stay: parseInt(rentData.length_of_stay),
        move_date: toUnixTimeStamp(date),
      });
    if (upStep) upStep();
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
          border: '1px solid black',
          borderRadius: '0.25rem',
          padding: '0.375rem 0.75rem',
          width: '60%',
        }}
      >
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
      </div>
    );
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('YOUR IDEAL PLACE')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Rent and timing')}</h3>
      </div>
      {/* <button onClick={() => console.log(currentData)}>click</button> */}
      <Form style={{ width: '35%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Budget')}</Form.Label>
          <div
            className="d-flex"
            style={{
              border: '1px solid #000000',
              width: '40%',
              borderRadius: '0.25rem',
            }}
          >
            <p style={{ margin: 0, paddingLeft: 5, paddingTop: 7, fontWeight: 600 }}>
              VND
            </p>
            <Form.Control
              type="tel"
              style={{ width: '65%' }}
              className={`border-light ${style.currencyInput}`}
              value={rentData.budget}
              onChange={handleChange('budget')}
              required
              // isInvalid={errorTitle}
            />
          </div>
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Move day')}</Form.Label>

          <div>{datePicker()}</div>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Length of stay')}</Form.Label>
          <Form.Control
            as="select"
            className="pr-3 border-dark"
            value={rentData.length_of_stay}
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
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
      </Form>

      <ButtonDirect
        currentStep={1}
        // downStep={downStep}
        onFinishStep={onFinish}
        disableValue={isEmpty()}
      />
    </Container>
  );
}

export default RentAndTiming;
