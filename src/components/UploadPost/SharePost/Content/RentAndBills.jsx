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
import { LengthOfStay } from '@helper/enum';
import { enumToArray } from 'helper';
import style from './Content.module.scss';

function RentAndBills({ currentData, upStep, downStep, onFinishRent }) {
  const { t } = useTranslation(['topnav']);
  const lengthStay = enumToArray(LengthOfStay);
  const [isErrorLength, setIsErrorLength] = useState(false);
  const [depositLength, setDepositLength] = useState(
    currentData.depositLength ?? '',
  );
  const billData = [
    { text: 'Include in rent', val: Bills.INCLUDE_IN_RENT },
    { text: 'Some in rent', val: Bills.SOME_IN_RENT },
    { text: 'Not in rent', val: Bills.NOT_IN_RENT },
  ];
  const [rentData, setRentData] = useState({
    bills: (currentData.detail && currentData.detail.bills) ?? Bills.INCLUDE_IN_RENT,
    rent: currentData.price ?? '',
  });

  const isEmpty = () => {
    return rentData.bills === '' || rentData.rent === '';
  };
  const handleChange = (field) => (event) => {
    const re = /^[0-9\b]+$/;
    if (
      field === 'rent' &&
      (re.test(event.target.value) || event.target.value === '')
    ) {
      if (event.target.value.length > 10) {
        setIsErrorLength(true);
      } else {
        setIsErrorLength(false);
      }
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
        detail: { ...currentData.detail, bills: rentData.bills, depositLength },
      });
    if (upStep) upStep();
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('Introduce your place')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Rent and bill(s)')}</h3>
      </div>
      {/* <button onClick={() => console.log(lengthStayDisplay)}>click</button> */}
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
              maxLength="10"
              required
              // isInvalid={isErrorLength}
            />
          </div>
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Your rent is invalids')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>
            {t('Minimum length of deposit')}
          </Form.Label>
          <Form.Control
            as="select"
            className="pr-3 border-dark"
            value={depositLength}
            onChange={(e) => setDepositLength(e.target.value)}
          >
            {lengthStay
              .filter((l) => l > -1)
              .map((l) => (
                <option
                  value={l}
                  key={l}
                  // disabled={stayAvailable.max !== '' && l > stayAvailable.max}
                >
                  {l === -1 ? 'Unlimited' : `${l} month${l > 1 ? 's' : ''}`}
                </option>
              ))}
          </Form.Control>
          {rentData.rent !== '' && depositLength !== '' && (
            <Form.Text>{`Your customer have to pay ${(
              depositLength * parseInt(rentData.rent)
            ).toLocaleString('en-US', {
              style: 'currency',
              currency: 'VND',
            })} for the deposit`}</Form.Text>
          )}
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
