import React from 'react';
import MapWithInitial from '@components/utils/Map/MapWithInitial';

function MapPreview({ address }) {
  const viewport = {
    longitude: address.longitude,
    latitude: address.latitude,
    height: '350px',
    width: '100%',
    zoom: 15,
  };
  const geocode = {
    longitude: address.longitude,
    latitude: address.latitude,
  };
  return (
    <div>
      <MapWithInitial
        viewportInitial={viewport}
        geocode={geocode}
        address={address.name}
      />
    </div>
  );
}

export default MapPreview;
