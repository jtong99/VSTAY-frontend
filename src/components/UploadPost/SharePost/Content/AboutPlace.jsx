import React, { useState } from 'react';
import {
  Button,
  Image,
  Container,
  Form,
  FormControl,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useTranslation } from 'i18n';
import MapModal from '@components/Map/MapModalSelectAddress';
import { Parking, Bills } from '@helper/enum';
import ButtonDirect from '../ButtonDirect';
import { PostType } from '@helper/enum';
import { HelpCircle } from 'react-feather';
import SelectNumberRoom from './util/SelectNumberRoom';

function AboutPlace({ onFinishAbout, downStep, currentData, upStep }) {
  const { t } = useTranslation(['topnav']);
  const [showSelectMap, setShowSelectMap] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false);
  const [aboutData, setAboutData] = useState({
    title: currentData.title ?? '',
    addressName: (currentData.address && currentData.address.name) ?? '',
    longitude: (currentData.address && currentData.address.longitude) ?? '',
    latitude: (currentData.address && currentData.address.latitude) ?? '',
    parking: (currentData.detail && currentData.detail.internet) ?? 'Select parking',
    internet:
      (currentData.detail && currentData.detail.internet) ?? 'Select internet',
    total_bathrooms: (currentData.detail && currentData.detail.total_bathrooms) ?? 0,
    total_bedrooms: (currentData.detail && currentData.detail.total_bedrooms) ?? 0,
  });
  const isEmpty = () => {
    return (
      aboutData.title === '' ||
      aboutData.addressName === '' ||
      aboutData.longitude === '' ||
      aboutData.latitude === '' ||
      aboutData.parking === 'Select parking' ||
      aboutData.internet === 'Select internet'
    );
  };
  const handleChange = (field) => (event) => {
    if (
      field === 'addressName' &&
      (aboutData.longitude === '' || aboutData.latitude === '')
    ) {
      setErrorLocation(true);
    } else {
      setErrorLocation(false);
    }
    if (field === 'title' && event.target.value === '') {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }
    setAboutData({
      ...aboutData,
      [field]: event.target.value,
    });
  };
  const handleChangeSpecific = (field, val) => {
    setAboutData({
      ...aboutData,
      [field]: val,
    });
  };
  const onSelectAddress = (longitude, latitude, addressName) => {
    setErrorLocation(false);
    setAboutData({ ...aboutData, longitude, latitude, addressName });
  };
  const finishSelectAddress = () => {
    console.log('select');
  };
  const popover = (
    <Popover id="popover-password-hint">
      {/* <Popover.Title as="h3">{t('Address Selection')}</Popover.Title> */}
      <Popover.Content as="div">
        <div>
          {t(
            'To allow Vstay save your address, please click button below and locate your place in our map. Vstay system will automatically save it.',
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
  const onFinish = () => {
    if (onFinishAbout)
      onFinishAbout({
        ...currentData,
        title: aboutData.title,
        address: {
          name: aboutData.addressName,
          geocode: {
            longitude: aboutData.longitude,
            latitude: aboutData.latitude,
          },
        },
        detail: {
          parking: aboutData.parking,
          internet: aboutData.internet,
          total_bedrooms: aboutData.total_bedrooms,
          total_bathrooms: aboutData.total_bathrooms,
        },
      });
    if (upStep) upStep();
  };
  const onChangeBed = (v) => {
    setAboutData({ ...aboutData, total_bedrooms: v });
  };
  const onChangeBath = (v) => {
    setAboutData({ ...aboutData, total_bathrooms: v });
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('Introduce your place')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('About your place')}</h3>
      </div>
      <Form style={{ width: '35%', margin: '0 auto' }}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Title')}</Form.Label>
          <Form.Control
            type="text"
            //   className=" border-light"
            value={aboutData.title}
            onChange={handleChange('title')}
            required
            isInvalid={errorTitle}
          />
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('Title cannot be empty')}
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>
            {t('Address')}{' '}
            <OverlayTrigger placement="right" overlay={popover}>
              <HelpCircle width="15px" height="15px" />
            </OverlayTrigger>
          </Form.Label>
          <Form.Control
            type="text"
            //   className=" border-light"
            value={aboutData.addressName}
            onChange={handleChange('addressName')}
            isInvalid={errorLocation}
            required
          />

          {showSelectMap && (
            <MapModal
              show={showSelectMap}
              dismiss={() => setShowSelectMap(false)}
              onFinish={onSelectAddress}
            />
          )}
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('You have to mark location on our map')}
          </FormControl.Feedback>
          <Form.Text>
            <Button
              variant="link"
              onClick={() => setShowSelectMap(!showSelectMap)}
              block
            >
              {t('Select your address')}
            </Button>
          </Form.Text>
        </Form.Group>

        {((currentData && currentData.type === PostType.R_HOUSE) ||
          currentData.type === PostType.N_HOUSE) && (
          <SelectNumberRoom onChangeBed={onChangeBed} onChangeBath={onChangeBath} />
        )}

        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Parking')}</Form.Label>
          <Form.Control
            as="select"
            className="pr-3"
            value={aboutData.parking}
            onChange={handleChange('parking')}
          >
            <option
              value="Select parking"
              style={{ fontWeight: 600 }}
              selected
              disabled
            >
              {t('Is your place includes parking?')}
            </option>
            <option value={Parking.YES}>{t('Yes, it includes')}</option>
            <option value={Parking.NO}>{t('No Parking')}</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label style={{ fontWeight: 600 }}>{t('Internet')}</Form.Label>
          <Form.Control
            as="select"
            className="pr-3"
            value={aboutData.internet}
            onChange={handleChange('internet')}
          >
            <option
              value="Select internet"
              style={{ fontWeight: 600 }}
              selected
              disabled
            >
              {t('Is rent includes internet?')}
            </option>
            <option value={Bills.INCLUDE_IN_RENT}>{t('Includes in rent')}</option>
            <option value={Bills.SOME_IN_RENT}>{t('Some in rent')}</option>
            <option value={Bills.NOT_IN_RENT}>
              {t('it separated, not in rent')}
            </option>
          </Form.Control>
        </Form.Group>
      </Form>
      <ButtonDirect
        currentStep={2}
        downStep={downStep}
        onFinishStep={onFinish}
        disableValue={isEmpty()}
      />
    </Container>
  );
}

export default AboutPlace;
