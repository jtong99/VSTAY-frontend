import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  FlyToInterpolator,
  Marker,
} from 'react-map-gl';
import { mapBoxToken } from '@helper/vars';
import { Image } from 'react-bootstrap';

function MapWithInitial({ viewportInitial = {}, geocode = {}, address = '' }) {
  const [viewport, setViewport] = useState(viewportInitial ?? '');
  const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  };
  const get = () => {
    return address.replace(/,/g, '').split(' ').slice(0, 2).join(' ');
  };
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={mapBoxToken}
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      //   transitionInterpolator={new FlyToInterpolator()}
    >
      {geocode !== {} && (
        <Marker {...geocode} offsetTop={-30} offsetLeft={-15}>
          <div
            style={{
              height: 150,
              width: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#002f7a',
              border: '1px solid rgb(182, 182, 182)',
              borderRadius: '50%',
              color: '#ffffff',
            }}
          >
            <div
              className="font-weight-600 text-center"
              style={{ width: 300, overflow: 'hidden' }}
            >
              {address || 'MARK'}
            </div>
          </div>
        </Marker>
      )}
      {/* <GeolocateControl
        style={geolocateStyle}
        // positionOptions={{ enableHighAccuracy: true }}
        // trackUserLocation={true}
        // showUserLocation={true}
        auto={true}
      /> */}
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
        <NavigationControl
          style={geolocateStyle}
          onViewportChange={(viewport) => setViewport(viewport)}
        />
      </div>
    </ReactMapGL>
  );
}

export default MapWithInitial;
