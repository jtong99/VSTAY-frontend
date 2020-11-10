import React from 'react';
import { useTranslation } from 'i18n';
import { RoomFeatures as featuresEnum } from '@helper/enum';
import { Button, Image, Container } from 'react-bootstrap';
import AirConditioner from '@assets/img/features/air-conditioner.svg';
import Balcony from '@assets/img/features/balcony.svg';
import Chair from '@assets/img/features/chair.svg';
import Couch from '@assets/img/features/couch.svg';
import Desk from '@assets/img/features/desk.svg';
import Fan from '@assets/img/features/fan.svg';
import Kitchenette from '@assets/img/features/kitchenette.svg';
import Table from '@assets/img/features/table.svg';
import Television from '@assets/img/features/tv.svg';
import Wardrobe from '@assets/img/features/wardrobe.svg';
import Lock from '@assets/img/features/lock.svg';

function Features({ features }) {
  const { t } = useTranslation(['topnav']);
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
  return (
    <div>
      <h4 style={{ fontWeight: 600 }}>{t('Features')}</h4>
      <div className="d-flex justify-content-between mt-4">
        {featuresData.slice(0, 2).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}

        {/* {featuresData.map((f, i) => (
          <div className={`${i % 2 === 0 ? 'flex-grow-1' : ''}`}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))} */}
      </div>
      <div className="d-flex justify-content-between mt-4">
        {featuresData.slice(2, 4).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-4">
        {featuresData.slice(4, 6).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-4">
        {featuresData.slice(6, 8).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-4">
        {featuresData.slice(8, 10).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
