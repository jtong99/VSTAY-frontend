import React from 'react';
import style from './Need.module.scss';
import { useTranslation } from 'i18n';

function Info() {
  const { t } = useTranslation(['topnav']);
  return (
    <div>
      <h2>duc</h2>
      <div className="d-flex">
        <div>
          <div className={style.tags}>Newbie</div>
        </div>

        <p className={style.tagsText}>{t('20 years old male')}</p>
      </div>
      <p></p>
    </div>
  );
}

export default Info;
