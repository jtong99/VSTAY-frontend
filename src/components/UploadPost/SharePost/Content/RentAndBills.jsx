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
import { Bills } from '@helper/enum';
import ButtonDirect from '../ButtonDirect';
import { enumToArray } from 'helper';
import style from './Content.module.scss';

function RentAndBills({ currentData, upStep, downStep, onFinishRent }) {
  const { t } = useTranslation(['topnav']);
  const [rentData, setRentData] = useState({
    bills: (currentData.detail && currentData.detail.bills) ?? '',
    rent: currentData.price ?? '',
  });
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
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('Introduce your place')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Rent and bill(s)')}</h3>
      </div>
      {/* <button onClick={() => console.log(currentData)}>click</button> */}
      <Form style={{ width: '35%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Monthly Rent')}</Form.Label>
          <div
            className="d-flex"
            style={{
              border: '1px solid #000000',
              width: '50%',
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
          <Form.Label style={{ fontWeight: 600 }}>{t('Bills')}</Form.Label>
          <Form.Control
            as="select"
            className="pr-3 border-dark"
            value={rentData.bills}
            onChange={(e) => setRentData({ ...rentData, bills: e.target.value })}
          >
            {billData.map((b) => (
              <option value={b.val}>{b.text}</option>
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

export default RentAndBills;
