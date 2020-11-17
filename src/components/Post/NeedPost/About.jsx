import React from 'react';
import { useTranslation } from 'i18n';
import { Check } from 'react-feather';
import style from './Need.module.scss';

function About() {
  const { t } = useTranslation(['topnav']);

  const Item = () => {
    return (
      <div className={style.itemFeatures}>
        <Check style={{ color: '#AADDFD' }} /> <span>Working full-time</span>
      </div>
    );
  };
  return (
    <div className="py-2">
      <div>
        <h4 style={{ fontWeight: 600 }}>{t('About')}</h4>
        <p className="my-4">hello iam duc</p>
      </div>
      <div>
        <h4 style={{ fontWeight: 600 }}>{t('Features')}</h4>
        <div className="d-flex flex-wrap">
          <Item />
          <Item />
        </div>
      </div>
    </div>
  );
}

export default About;
