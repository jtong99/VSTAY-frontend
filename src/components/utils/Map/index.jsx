import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  FlyToInterpolator,
  Marker,
} from 'react-map-gl';
import MarkImg from '@assets/img/location.svg';
import { Image } from 'react-bootstrap';
import { mapBoxToken } from '@helper/vars';
import useDataFromGeocode from '@hooks/api/useDataFromGeocode';

function MapComponent({ width, height, onSetLocation, onSetAddress }) {
  const [viewport, setViewport] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 10,
    width,
    height,
    zoom: 10,
  });
  const [markers, setMarkers] = useState('');
  const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  };
  const getAddressName = ({ features }) => {
    return features[2].place_name;
  };
  const handleClick = async (e) => {
    const longitude = e.lngLat[0];
    const latitude = e.lngLat[1];
    const data = await useDataFromGeocode({ longitude, latitude });
    if (onSetLocation) onSetLocation({ longitude, latitude });
    if (onSetAddress) onSetAddress(getAddressName(data));
    setMarkers({ longitude, latitude });
  };
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={mapBoxToken}
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      transitionInterpolator={new FlyToInterpolator()}
      onClick={handleClick}
    >
      {markers !== '' && (
        <Marker {...markers} offsetTop={-30} offsetLeft={-15}>
          <div
            style={{
              height: 30,
              width: 30,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image src={MarkImg} width="100%" height="100%" />
          </div>
        </Marker>
      )}
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
        {' '}
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
          auto={true}
        />
      </div>

      <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
        <NavigationControl
          style={geolocateStyle}
          onViewportChange={(viewport) => setViewport(viewport)}
        />
      </div>
    </ReactMapGL>
  );
}

export default MapComponent;
