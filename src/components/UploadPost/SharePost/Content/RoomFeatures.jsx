import React, { useState } from 'react';
import { Button, Image, Container } from 'react-bootstrap';
import style from './Content.module.scss';
import { useTranslation } from 'i18n';
import AirConditioner from '../img/air-conditioner.svg';
import Balcony from '../img/balcony.svg';
import Chair from '../img/chair.svg';
import Couch from '../img/couch.svg';
import Desk from '../img/desk.svg';
import Fan from '../img/fan.svg';
import Kitchenette from '../img/kitchenette.svg';
import Table from '../img/table.svg';
import Television from '../img/television.svg';
import Wardrobe from '../img/wardrobe.svg';
import Lock from '../img/padlock.svg';
import Check from './img/check.svg';

import ButtonDirect from '../ButtonDirect';
import { RoomFeatures as featuresEnum } from '@helper/enum';

function RoomFeatures({ onFinishFeatures, currentData, upStep, downStep }) {
  const { t } = useTranslation(['topnav']);
  const [featuresSelected, setFeaturesSelected] = useState(
    currentData.features ?? [],
  );
  const featuresData = [
    {
      icon: AirConditioner,
      text: 'Air Conditioner',
      value: featuresEnum.AIR_CONDITIONER,
    },
    { icon: Balcony, text: 'Balcony', value: featuresEnum.BALCONY },
    { icon: Chair, text: 'Chair', value: featuresEnum.CHAIR },
    { icon: Couch, text: 'Couch', value: featuresEnum.COUCH },
    { icon: Desk, text: 'Desk', value: featuresEnum.DESK },
    { icon: Fan, text: 'Fan', value: featuresEnum.FAN },
    { icon: Kitchenette, text: 'Kitchenette', value: featuresEnum.KITCHENETTE },
    { icon: Table, text: 'Table', value: featuresEnum.TABLE },
    { icon: Television, text: 'Television', value: featuresEnum.TV },
    { icon: Wardrobe, text: 'Wardrobe', value: featuresEnum.WARDROBE },
    { icon: Lock, text: 'Lock', value: featuresEnum.DOOR_LOCK },
  ];
  const addFeatures = (v) => setFeaturesSelected([...featuresSelected, v]);
  const removeFeatures = (index) =>
    setFeaturesSelected([
      ...featuresSelected.slice(0, index),
      ...featuresSelected.slice(index + 1, featuresSelected.length),
    ]);
  const handleClick = (v) => {
    if (featuresSelected.includes(v)) {
      removeFeatures(featuresSelected.indexOf(v));
    } else {
      addFeatures(v);
    }
  };
  const onFinish = () => {
    if (onFinishFeatures)
      onFinishFeatures({ ...currentData, features: featuresSelected });
    if (upStep) upStep();
  };

  return (
    <Container className="pt-5">
      {/* <button onClick={() => console.log(featuresSelected)}>click</button> */}
      <div className="p-3">
        <h4 className="text-secondary">{t('Introduce your place')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Room features')}</h3>
      </div>
      <h5 style={{ fontWeight: 600 }} className="text-center mb-4">
        {t('Room furnishing and features')}
      </h5>
      <div
        className="d-flex justify-content-center flex-wrap "
        style={{ width: '65%', margin: '0 auto' }}
      >
        {featuresData.map((i) => (
          <div className={`${style.property__Container}`}>
            <div>
              <Button
                variant="link"
                onClick={() => handleClick(i.value)}
                className={`${style.features__Container} text-center ${
                  featuresSelected.includes(i.value)
                    ? style.boardingHouse__ContainerHover
                    : ''
                }

                ${
                  !featuresSelected.includes(i.value)
                    ? style.features__ContainerHover
                    : ''
                } 
                `}
                block
              >
                <Image
                  src={i.icon}
                  className={style.iconFeatures}
                  style={{ margin: '0 auto', position: 'relative' }}
                />
                {featuresSelected.includes(i.value) && (
                  <Image
                    src={Check}
                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                  />
                )}
              </Button>
            </div>

            <p style={{ margin: '0 auto' }}>{t(i.text)}</p>
          </div>
        ))}
        <div style={{ width: 104, margin: '2rem' }} />
      </div>
      <ButtonDirect
        currentStep={1}
        downStep={downStep}
        onFinishStep={onFinish}
        disableValue={false}
      />
    </Container>
  );
}

export default RoomFeatures;
