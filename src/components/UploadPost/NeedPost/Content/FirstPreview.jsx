import React from 'react';
import { Image, Container } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import ButtonDirect from '../ButtonDirect';
import PreviewImg from '@assets/img/preview.svg';

function FirstPreview({ onFinishDescription, upStep }) {
  const { t } = useTranslation(['topnav']);
  return (
    <Container className="pt-5">
      <div className="p-3 text-center">
        <h3 style={{ fontWeight: 600, textAlign: 'center' }}>
          {t('Show me what my listing will look like')}
        </h3>
        <Image src={PreviewImg} width="140px" className="m-5" />
        <p style={{ fontWeight: 600, textAlign: 'center' }}>
          {t('Preview Listing')}
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

export default FirstPreview;
