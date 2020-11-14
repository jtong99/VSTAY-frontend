import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'i18n';

function ButtonDIrect({
  currentStep,
  upStep,
  downStep,
  onFinishStep,
  disableValue,
}) {
  const { t } = useTranslation(['topnav']);
  return (
    <div className="text-center">
      {currentStep === 0 && (
        <Button
          variant="green"
          onClick={upStep}
          style={{ fontWeight: 600, width: '180px', height: 46 }}
        >
          {t('Ok, I’m ready')}
        </Button>
      )}
      {currentStep > 0 && (
        <div style={{ marginTop: '5rem' }}>
          <Button
            variant="true-green"
            onClick={onFinishStep}
            disabled={disableValue}
            style={{ fontWeight: 600, width: '180px', height: 46 }}
          >
            {t('Next')}
          </Button>
          {/* <Button
            variant="link"
            onClick={downStep}
            style={{ fontWeight: 600, margin: '30px auto', color: '#000000' }}
            block
          >
            {t('Back')}
          </Button> */}
        </div>
      )}
    </div>
  );
}

export default ButtonDIrect;
