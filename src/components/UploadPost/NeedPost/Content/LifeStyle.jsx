import React, { useState } from 'react';
import { Button, Image, Container } from 'react-bootstrap';
import style from './Content.module.scss';
import { useTranslation } from 'i18n';
import { lifeStyleData } from '@helper/feature';
import Check from '../../img/check.svg';
import ButtonDirect from '../ButtonDirect';

function LifeStyleComponent({ onFinishEmploy, currentData, upStep, downStep }) {
  const { t } = useTranslation(['topnav']);
  const [featuresSelected, setFeaturesSelected] = useState(
    currentData.life_style ?? [],
  );
  const [featuresDisplay, setFeaturesDisplay] = useState(
    currentData.lifeStyleDisplay ?? [],
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
    if (onFinishEmploy)
      onFinishEmploy({
        ...currentData,
        life_style: featuresSelected,
        lifeStyleDisplay,
      });
    if (upStep) upStep();
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('INTRODUCE YOURSELF')}</h4>
        <h3 style={{ fontWeight: 600 }}>{t('Lifestyle')}</h3>
      </div>
      <div
        className="d-flex justify-content-center flex-wrap "
        style={{ width: '65%', margin: '90px auto' }}
      >
        {lifeStyleData.map((i) => (
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

export default LifeStyleComponent;
