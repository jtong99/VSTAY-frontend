import React from 'react';
import style from './Need.module.scss';
import { useTranslation } from 'i18n';

function Info({ data }) {
  const { t } = useTranslation(['topnav']);
  return (
    <div>
      <h2>{data.name}</h2>
      <div className="d-flex">
        <div>
          <div className={style.tags}>Newbie</div>
        </div>

        <p className={style.tagsText}>{`${data.age} years old ${data.gender}`}</p>
      </div>
      <p></p>
    </div>
  );
}

export default Info;
