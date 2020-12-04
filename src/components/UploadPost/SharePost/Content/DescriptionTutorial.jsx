import React from 'react';
import { Image, Container } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import ButtonDirect from '../ButtonDirect';
import DescriptionImg from '../../img/Description.svg';

function Description({ onFinishDescription, upStep, currentData }) {
  const { t } = useTranslation(['topnav']);
  return (
    <Container className="pt-5">
      <button onClick={() => console.log(currentData)}>click</button>
      <div className="p-3 text-center">
        <h3 style={{ fontWeight: 600, textAlign: 'center' }}>
          {t('Introduce yourself and your property')}
        </h3>
        <Image src={DescriptionImg} width="170px" className="m-5" />
        <p style={{ fontWeight: 600, textAlign: 'center' }}>
          {t('Introduce yourself and property')}
        </p>
        <p className="text-secondary">
          {t('Help your future customer know about you and your property')}
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
