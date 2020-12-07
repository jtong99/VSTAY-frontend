import React from 'react';
import { Popup } from 'react-map-gl';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { useTranslation } from 'i18n';
import { truncate } from '@helper/truncate';

function PopUpNeed({ latitude, longitude, data, onClose }) {
  const { t } = useTranslation(['map-explore']);
  if (!data.show) {
    return null;
  }
  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={onClose}
      anchor="bottom"
      offsetTop={-20}
    >
      <div style={{ width: '200px', padding: 10 }}>
        {/* <div>
            <Image />
          <CarouselImage images={data.images} imageHeight="150px" />
        </div> */}
        <p className="font-weight-600">{data.about.name}</p>
        <p>{truncate(data.description, 100)}</p>
        <p>
          {t('Budget')}:{' '}
          {data.budget.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
        <div>
          <Link href={`/need-post?p=${data._id}`}>
            <a>{t('detail...')}</a>
          </Link>
        </div>
      </div>
    </Popup>
  );
}

export default PopUpNeed;
