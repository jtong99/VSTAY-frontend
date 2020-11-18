import React, { useState } from 'react';
import { Button, Image, Container, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import { Gender } from '@helper/enum';
import ButtonDirect from '../ButtonDirect';

function IntroduceInput({ currentData, upStep, downStep, onFinishInput }) {
  const { t } = useTranslation(['topnav']);
  const [about, setAbout] = useState({
    name: (currentData.about && currentData.about.name) ?? '',
    age: (currentData.about && currentData.about.age) ?? '',
    gender: (currentData.about && currentData.about.gender) ?? '',
  });
  const gender = [
    { text: 'Male', value: Gender.MALE },
    { text: 'Female', value: Gender.FEMALE },
  ];
  const handleChange = (field) => (event) => {
    const re = /^[0-9\b]+$/;
    if (
      field === 'age' &&
      event.target.value.length < 3 &&
      (re.test(event.target.value) || event.target.value === '')
    ) {
      return setAbout({
        ...about,
        [field]: event.target.value,
      });
    } else if (field !== 'age') {
      return setAbout({
        ...about,
        [field]: event.target.value,
      });
    }
  };
  const onFinish = () => {
    if (onFinishInput)
      onFinishInput({
        ...currentData,
        about,
      });
    if (upStep) upStep();
  };
  const isEmpty = () => {
    return about.name === '' || about.age === '' || about.gender === '';
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('INTRODUCE YOURSELF')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('About you')}</h3>
      </div>
      <Form style={{ width: '35%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Your name')}</Form.Label>
          <Form.Control
            type="text"
            //   className=" border-light"
            value={about.name}
            onChange={handleChange('name')}
            required
          />
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Age')}</Form.Label>
          <Form.Control
            type="tel"
            style={{ width: '35%' }}
            value={about.age}
            onChange={handleChange('age')}
            required
            // isInvalid={errorTitle}
          />
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Your gender')}</Form.Label>
          <div>
            {gender.map((b) => (
              <Button
                variant="whiter"
                className={`border-dark ${
                  about.gender === b.value ? 'bg-black-blue' : ''
                }`}
                onClick={() => setAbout({ ...about, gender: b.value })}
                style={{
                  padding: '15px 68px 15px 68px',
                  borderRadius: 'initial',
                  color: about.gender === b.value ? '#ffffff' : '#000000',
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

export default IntroduceInput;
