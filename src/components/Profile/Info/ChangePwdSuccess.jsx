import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'react-feather';
import { useTranslation } from 'i18n';

function ChangePwdSuccess() {
  const { t } = useTranslation(['profile']);
  const [counter, setCounter] = useState(5);
  useEffect(() => {
    setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);
  }, [counter]);
  return (
    <div style={{ textAlign: 'center' }}>
      <CheckCircle className="text-success" />
      <p style={{ marginTop: 6 }}>
        {t('Success')}! {t('You changed password successfully')}{' '}
        <strong>{counter}</strong>s
      </p>
    </div>
  );
}

export default ChangePwdSuccess;
