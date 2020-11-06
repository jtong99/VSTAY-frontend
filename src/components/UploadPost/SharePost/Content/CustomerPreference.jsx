import React, { useState, useRef, forwardRef, createRef } from 'react';
import { Button, Image, Container, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import ButtonDirect from '../ButtonDirect';
import { CustomerPreference as Preference } from '@helper/enum';

function CustomerPreference({
  onFinishRoomAvailability,
  currentData,
  upStep,
  downStep,
}) {
  const { t } = useTranslation(['topnav']);
  const [pre, setPre] = useState(
    (currentData.detail && currentData.detail.except) ?? '',
  );
  const preferenceData = [
    { text: 'Anyone', val: Preference.ANYONE },
    { text: 'Female Only', val: Preference.FEMALE_ONLY },
    { text: 'Male only', val: Preference.MALE_ONLY },
    { text: 'No Couple', val: Preference.NO_COUPLE },
    { text: 'Just Couple', val: Preference.COUPLE },
  ];
  const onFinish = () => {
    if (onFinishRoomAvailability)
      onFinishRoomAvailability({
        ...currentData,
        detail: {
          ...currentData.detail,
          except: pre,
        },
      });
    if (upStep) upStep();
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('Your ideal customer(s)')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Customers Preference')}</h3>
      </div>
      <div style={{ width: '40%', margin: '0 auto' }}>
        {preferenceData.map((p) => (
          <Button
            variant="whiter"
            className={`border-dark ${pre === p.val ? 'bg-black-blue' : ''}`}
            onClick={() => setPre(p.val)}
            style={{
              padding: '15px 68px 15px 68px',
              borderRadius: 'initial',
              color: pre === p.val ? '#ffffff' : '#000000',
              fontWeight: 600,
            }}
            block
          >
            {p.text}
          </Button>
        ))}
      </div>
      <ButtonDirect currentStep={8} onFinishStep={onFinish} />
    </Container>
  );
}

export default CustomerPreference;
