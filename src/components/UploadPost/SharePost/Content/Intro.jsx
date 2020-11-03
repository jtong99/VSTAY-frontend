import React from 'react';
import IntroImg from './img/Intro.svg';
import { useTranslation } from 'i18n';
import { Image, Button } from 'react-bootstrap';

import ButtonDirect from '../ButtonDirect';
function Intro({ upStep }) {
  const { t } = useTranslation(['topnav']);
  return (
    <>
      <div className="text-center">
        <div style={{ paddingTop: 100, paddingBottom: 100 }}>
          <h3>Hello Duc, let’s get started</h3>
          <Image src={IntroImg} width="150px" className="py-5" />
          <h5 style={{ fontWeight: 600 }}>{t('Introduce your place')}</h5>
          <h5 style={{ color: '#919191' }}>
            {t('Beds, rooms, furniture, toilets etc')}
          </h5>
        </div>
      </div>

      <ButtonDirect currentStep={0} upStep={upStep} />
    </>
  );
}

export default Intro;
