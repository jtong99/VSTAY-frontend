import React, { useState } from 'react';
import { Button, Image, Container } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import BoardingHouse from '../../img/BoardingHouse.svg';
import House from '../../img/House.svg';
import WholeProperty from '../../img/WholeProperty.svg';
import style from './Content.module.scss';
import { PostType } from '@helper/enum';
import ButtonDirect from '../ButtonDirect';
import Check from '../../img/check.svg';

function SelectTypeAccommodation({
  onFinishSelectType,
  currentData,
  upStep,
  downStep,
}) {
  const { t } = useTranslation(['topnav']);
  const [typeValue, setTypeValue] = useState(
    currentData && currentData.type ? currentData.type : '',
  );
  const propertyImage = [
    { img: BoardingHouse, text: 'Room(s) in boarding house', val: PostType.S_ROOM },
    { img: House, text: 'Room(s) in house', val: PostType.S_HOUSE },
    { img: WholeProperty, text: 'Whole property renting', val: PostType.R_HOUSE },
  ];
  const onFinish = () => {
    if (onFinishSelectType) onFinishSelectType({ ...currentData, type: typeValue });
    if (upStep) upStep();
  };
  return (
    <Container className="pt-5">
      <div className="p-3">
        <h4 className="text-secondary">{t('YOUR IDEAL PLACE')}</h4>
        <h3 style={{ fontWeight: 600 }}>
          {t('What type of place are you looking for')}
        </h3>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        {propertyImage.map((i) => (
          <div className={`${style.property__Container}`}>
            <div>
              <Button
                variant="link"
                onClick={() => setTypeValue(i.val)}
                className={`${style.boardingHouse__Container} text-center ${
                  typeValue === i.val ? style.boardingHouse__ContainerHover : ''
                } ${typeValue !== i.val ? style.typeHover : ''}`}
                block
              >
                <Image
                  src={i.img}
                  className={style.boardingHouse}
                  style={{ margin: '0 auto', position: 'relative' }}
                />
                {typeValue === i.val && (
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
        disableValue={typeValue === ''}
      />
    </Container>
  );
}

export default SelectTypeAccommodation;
