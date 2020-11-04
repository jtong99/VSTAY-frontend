import React, { useState } from 'react';
import { Button, Image, Container, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import MapModal from '@components/Map/MapModalSelectAddress';
import { Parking, Bills } from '@helper/enum';

function AboutPlace() {
  const enumToArray = function (enumObject) {
    const all = [];
    for (const key in enumObject) {
      all.push(enumObject[key]);
    }
    return all;
  };
  const { t } = useTranslation(['topnav']);
  const [showSelectMap, setShowSelectMap] = useState(false);
  const [aboutData, setAboutData] = useState({
    title: '',
    addressName: '',
    longitude: '',
    latitude: '',
    parking: 'Select parking',
    internet: '',
    total_bathrooms: 0,
    total_bedrooms: 0,
  });
  const internetValue = enumToArray(Bills);
  const [errorTitle, setErrorTitle] = useState(false);
  const handleChange = (field) => (event) => {
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
  const onSelectAddress = (longitude, latitude, addressName) => {
    setAboutData({ ...aboutData, longitude, latitude, addressName });
  };
  const finishSelectAddress = () => {
    console.log('select');
  };
  return (
    <Container className="pt-5">
      <button onClick={() => console.log(aboutData)}>click</button>
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
          <Form.Label style={{ fontWeight: 600 }}>{t('Address')}</Form.Label>
          {aboutData.addressName !== '' && <p>{aboutData.addressName}</p>}
          <Button
            variant="primary"
            onClick={() => setShowSelectMap(!showSelectMap)}
            block
          >
            {t('Select your address')}
          </Button>
          {showSelectMap && (
            <MapModal
              show={showSelectMap}
              dismiss={() => setShowSelectMap(false)}
              onFinish={onSelectAddress}
            />
          )}
          <FormControl.Feedback type="invalid" style={{ whiteSpace: 'pre-line' }}>
            {t('error.message')}
          </FormControl.Feedback>
        </Form.Group>

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
    </Container>
  );
}

export default AboutPlace;
