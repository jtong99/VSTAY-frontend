import React, { useState } from 'react';
import { Button, Image, Container, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import ButtonDirect from '../ButtonDirect';

function Descriprtion({ onFinishInput, currentData, upStep, downStep }) {
  const { t } = useTranslation(['topnav']);
  const [description, setDescription] = useState(currentData.description ?? '');
  const onFinish = () => {
    if (onFinishInput)
      onFinishInput({
        ...currentData,
        description,
      });
    if (upStep) upStep();
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('Introduce yourself')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Describe something about you')}</h3>
      </div>
      <div className="mt-3">
        <Form style={{ width: '55%', margin: '0 auto' }}>
          <Form.Group>
            <Form.Control
              type="text"
              as="textarea"
              placeholder={t('Say something about yourself')}
              className=" border-dark"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: '200px' }}
              required
            />
            <Form.Text>
              {t(
                "Describe something about yourself. What do you do for work, what do you like to do for fun and where you are from. Also remember to let us know what you're looking for.",
              )}
            </Form.Text>
            <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
              {t('Title cannot be empty')}
            </FormControl.Feedback>
          </Form.Group>
        </Form>
      </div>
      <ButtonDirect
        currentStep={2}
        downStep={downStep}
        onFinishStep={onFinish}
        disableValue={description === ''}
      />
    </Container>
  );
}

export default Descriprtion;
