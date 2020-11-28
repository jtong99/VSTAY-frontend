import React from 'react';
import { Popup } from 'react-map-gl';
import CarouselImage from '@components/utils/CarouselImages';
import Link from 'next/link';

function PopUpShare({ latitude, longitude, data, onClose }) {
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
      </div>
    </Popup>
  );
}

export default PopUpShare;
