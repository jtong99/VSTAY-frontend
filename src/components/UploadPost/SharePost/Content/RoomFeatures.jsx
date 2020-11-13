import React, { useState } from 'react';
import { Button, Image, Container } from 'react-bootstrap';
import style from './Content.module.scss';
import { useTranslation } from 'i18n';
import Check from './img/check.svg';
import { featuresData } from '@helper/feature';

import ButtonDirect from '../ButtonDirect';

function RoomFeatures({ onFinishFeatures, currentData, upStep, downStep }) {
  const { t } = useTranslation(['topnav']);
  const [featuresSelected, setFeaturesSelected] = useState(
    currentData.features ?? [],
  );
  const [featuresDisplay, setFeaturesDisplay] = useState(
    currentData.featuresDisplay ?? [],
  );
  const addFeatures = (v) => setFeaturesSelected([...featuresSelected, v]);
  const addFeaturesDisplay = (v) => setFeaturesDisplay([...featuresDisplay, v]);
  const removeFeatures = (index) =>
    setFeaturesSelected([
      ...featuresSelected.slice(0, index),
      ...featuresSelected.slice(index + 1, featuresSelected.length),
    ]);

  const removeFeaturesDisplay = (index) =>
    setFeaturesDisplay([
      ...featuresDisplay.slice(0, index),
      ...featuresDisplay.slice(index + 1, featuresDisplay.length),
    ]);
  const handleClick = (v) => {
    if (featuresSelected.includes(v.value)) {
      removeFeatures(featuresSelected.indexOf(v.value));
      removeFeaturesDisplay(
        featuresDisplay
          .map((f) => {
            return f.value;
          })
          .indexOf(v.value),
      );
    } else {
      addFeatures(v.value);
      addFeaturesDisplay(v);
    }
  };
  const onFinish = () => {
    if (onFinishFeatures)
      onFinishFeatures({
        ...currentData,
        features: featuresSelected,
        featuresDisplay,
      });
    if (upStep) upStep();
  };

  return (
    <Container className="pt-5">
      {/* <button onClick={() => console.log(featuresDisplay)}>click</button> */}
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
                onClick={() => handleClick(i)}
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
