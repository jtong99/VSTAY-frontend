import React from 'react';
import { Popup } from 'react-map-gl';
import CarouselImage from '@components/utils/CarouselImages';
import Link from 'next/link';
import { useTranslation } from 'i18n';

function PopUpShare({ latitude, longitude, data, onClose }) {
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
        <div>
          <CarouselImage images={data.images} imageHeight="150px" />
        </div>
        <p className="font-weight-600">{data.title}</p>
        <p>
          {t('price')}:{' '}
          {data.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
        <div>
          <Link href={`/share-post?p=${data._id}`}>
            <a>{t('detail...')}</a>
          </Link>
        </div>
      </div>
    </Popup>
  );
}

export default PopUpShare;
