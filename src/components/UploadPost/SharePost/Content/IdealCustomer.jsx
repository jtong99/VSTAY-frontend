import React, { useState, useRef, forwardRef, createRef } from 'react';
import { Button, Image, Container, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import ButtonDirect from '../ButtonDirect';
import IdealCustomerImg from './img/IdealCustomer.svg';

function IdealCustomer({ upStep, downStep }) {
  const { t } = useTranslation(['topnav']);
  return (
    <Container className="pt-5">
      <div className="p-3 text-center">
        <h3 style={{ fontWeight: 600, textAlign: 'center' }}>
          {t('Show us your ideal customer(s)')}
        </h3>
        <Image src={IdealCustomerImg} width="170px" className="m-5" />
        <p style={{ fontWeight: 600, textAlign: 'center' }}>
          {t('Show us your ideal customer(s)')}
        </p>
        <p className="text-secondary">
          {t('Pets, kids, smoking, start date, length of stay etc.')}
        </p>
      </div>
      <ButtonDirect
        currentStep={7}
        onFinishStep={() => upStep()}
        disableValue={pre === ''}
      />
    </Container>
  );
}

export default IdealCustomer;
