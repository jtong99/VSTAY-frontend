import React from 'react';
import { useTranslation } from 'i18n';

function AboutComponent({ about }) {
  const { t } = useTranslation(['topnav']);
  return (
    <div>
      <h4 style={{ fontWeight: 600 }}>{t('About')}</h4>
      <p>{about}</p>
    </div>
  );
}

export default AboutComponent;
