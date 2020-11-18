import React from 'react';
import { useTranslation } from 'i18n';
import { Check } from 'react-feather';
import style from './Need.module.scss';

function About({ description, features, lifeStyle }) {
  const { t } = useTranslation(['topnav']);

  const Item = ({ text }) => {
    return (
      <div className={style.itemFeatures}>
        <Check style={{ color: '#AADDFD' }} /> {text}
      </div>
    );
  };
  return (
    <div className="py-2">
      <div>
        <h4 style={{ fontWeight: 600 }}>{t('About')}</h4>
        <p className="my-4">{description}</p>
      </div>
      <div>
        <h4 style={{ fontWeight: 600 }}>{t('Features')}</h4>
        <div className="d-flex flex-wrap">
          {features.map((f) => (
            <>
              <Item key={f.value} text={f.text} />
            </>
          ))}
          {lifeStyle.map((f) => (
            <>
              <Item key={f.value} text={f.text} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
