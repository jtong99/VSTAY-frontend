import React from 'react';
import MapWithInitial from '@components/utils/Map/MapWithInitial';

function MapPreview() {
  const viewport = {
    longitude: 105.77034019999995,
    latitude: 10.04403640411679,
    height: '350px',
    width: '100%',
    zoom: 15,
  };
  const geocode = {
    longitude: 105.77034019999995,
    latitude: 10.04403640411679,
  };
  return (
    <div>
      <MapWithInitial viewportInitial={viewport} geocode={geocode} />
    </div>
  );
}

export default MapPreview;
