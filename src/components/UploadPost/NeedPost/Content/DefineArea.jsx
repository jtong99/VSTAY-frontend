import React, { useState } from 'react';
import { Button, Image, Container, OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import Map from '@components/utils/Map';
import ButtonDirect from '../ButtonDirect';
import { HelpCircle } from 'react-feather';

import useDataFromGeocode from '@hooks/api/useDataFromGeocode';

function DefineArea({ onFinishMap, currentData, upStep, downStep }) {
  const { t } = useTranslation(['topnav']);
  const [location, setLocation] = useState({
    longitude:
      (currentData && currentData.location && currentData.location.longitude) || '',
    latitude:
      (currentData && currentData.location && currentData.location.latitude) || '',
  });
  const [address, setAddress] = useState('');
  const popover = (
    <Popover id="popover-address-hint">
      {/* <Popover.Title as="h3">{t('Address Selection')}</Popover.Title> */}
      <Popover.Content as="div">
        <div>
          {t(
            'To help us find your accommodation, please find and click where you want to live on our map.',
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
  const onFinish = () => {
    if (onFinishMap) onFinishMap({ ...currentData, location, address });
    if (upStep) upStep();
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('YOUR IDEAL PLACE')}</h4>
        <h3 style={{ fontWeight: 600 }}>
          {t('Where would you like to live?')}{' '}
          <OverlayTrigger placement="right" overlay={popover}>
            <HelpCircle width="15px" height="15px" />
          </OverlayTrigger>
        </h3>
      </div>

      <div className="p-3" style={{ width: '100%' }}>
        <Map
          height="350px"
          onSetLocation={(v) => setLocation(v)}
          onSetAddress={(v) => setAddress(v)}
          width="100%"
        />
      </div>
      <ButtonDirect
        currentStep={1}
        // downStep={downStep}
        onFinishStep={onFinish}
        disableValue={location.latitude === '' || location.longitude === ''}
      />
    </Container>
  );
}

export default DefineArea;
