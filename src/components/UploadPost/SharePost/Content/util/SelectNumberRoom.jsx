import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'i18n';

function SelectNumberRoom({ onChangeBed, onChangeBath }) {
  const [bedroom, setBedroom] = useState('');
  const [bathroom, setBathroom] = useState('');
  const { t } = useTranslation(['topnav']);
  const bedSelect = [2, 3, 4, 5];
  const handleChangeBed = (value) => {
    onChangeBed(value);
    setBedroom(value);
  };
  const handleChangeBath = (value) => {
    onChangeBath(value);
    setBathroom(value);
  };
  return (
    <>
      <div>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Total bedrooms')} </Form.Label>

          <div>
            {bedSelect.map((b, i) => (
              <Button
                key={`item-${i}`}
                variant="whiter"
                className={`border-dark ${bedroom === b ? 'bg-black-blue' : ''}`}
                onClick={() => handleChangeBed(b)}
                style={{
                  padding: '15px 41px 15px 41px',
                  borderRadius: 'initial',
                  color: bedroom === b ? '#ffffff' : '#000000',
                  fontWeight: 600,
                }}
              >
                {b === 5 ? '5+' : b}
              </Button>
            ))}
          </div>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('error.message')}
          </FormControl.Feedback>
        </Form.Group>
      </div>
      <div>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>
            {t('Total bathrooms')}{' '}
          </Form.Label>

          <div>
            {bedSelect.map((b, i) => (
              <Button
                key={`item-${i}`}
                variant="whiter"
                className={`border-dark ${bathroom === b ? 'bg-black-blue' : ''}`}
                onClick={() => handleChangeBath(b)}
                style={{
                  padding: '15px 41px 15px 41px',
                  borderRadius: 'initial',
                  color: bathroom === b ? '#ffffff' : '#000000',
                  fontWeight: 600,
                }}
              >
                {b === 5 ? '5+' : b}
              </Button>
            ))}
          </div>

          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('error.message')}
          </FormControl.Feedback>
        </Form.Group>
      </div>
    </>
  );
}

export default SelectNumberRoom;
