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

function RentAndTiming({ currentData, upStep, downStep, onFinishRent }) {
  const { t } = useTranslation(['topnav']);
  const lengthStay = enumToArray(LengthOfStay);
  const [rentData, setRentData] = useState({
    bills: (currentData.detail && currentData.detail.bills) ?? '',
    rent: currentData.price ?? '',
  });
  const [date, setDate] = useState(
    (currentData.detail &&
      currentData.detail.room_availability &&
      currentData.detail.room_availability.date_availability) ??
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  );
  const billData = [
    { text: 'Include in rent', val: Bills.INCLUDE_IN_RENT },
    { text: 'Some in rent', val: Bills.SOME_IN_RENT },
    { text: 'Not in rent', val: Bills.NOT_IN_RENT },
  ];
  const isEmpty = () => {
    return rentData.bills === '' || rentData.rent === '';
  };
  const handleChange = (field) => (event) => {
    const re = /^[0-9\b]+$/;
    if (
      field === 'rent' &&
      (re.test(event.target.value) || event.target.value === '')
    ) {
      setRentData({
        ...rentData,
        [field]: event.target.value,
      });
    }
    // return setRentData({
    //   ...rentData,
    //   [field]: event.target.value,
    // });
  };
  const onFinish = () => {
    if (onFinishRent)
      onFinishRent({
        ...currentData,
        price: parseInt(rentData.rent),
        detail: { ...currentData.detail, bills: rentData.bills },
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
      <Form style={{ width: '35%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Monthly Rent')}</Form.Label>
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
              value={rentData.rent}
              onChange={handleChange('rent')}
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
          <Form.Label style={{ fontWeight: 600 }}>{t('Bills')}</Form.Label>
          <Form.Control
            as="select"
            className="pr-3 border-dark"
            // value={stayAvailable.max}
            // onChange={(e) =>
            //   setStayAvailable({ ...stayAvailable, max: e.target.value })
            // }
          >
            <option
              value="Select parking"
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
    </Container>
  );
}

export default RentAndTiming;
