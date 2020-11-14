import React from 'react';
import { Image, Container } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import ButtonDirect from '../ButtonDirect';
import IdealCustomer from '../../img/IdealCustomer.svg';

function Description({ onFinishDescription, upStep }) {
  const { t } = useTranslation(['topnav']);
  return (
    <Container className="pt-5">
      <div className="p-3 text-center">
        <h3 style={{ fontWeight: 600, textAlign: 'center' }}>
          {t('Introduce yourself')}
        </h3>
        <Image src={IdealCustomer} width="170px" className="m-5" />
        <p style={{ fontWeight: 600, textAlign: 'center' }}>
          {t('Introduce yourself')}
        </p>
        <p className="text-secondary">
          {t('Help your future flatmate learn about you')}
        </p>
      </div>
      <ButtonDirect
        currentStep={7}
        onFinishStep={() => upStep()}
        disableValue={false}
      />
    </Container>
  );
}

export default Description;
