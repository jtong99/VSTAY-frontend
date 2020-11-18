import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  FlyToInterpolator,
  Marker,
} from 'react-map-gl';
import { mapBoxToken } from '@helper/vars';
import { Image } from 'react-bootstrap';

function MapWithInitial({ viewportInitial = {}, geocode = {} }) {
  const [viewport, setViewport] = useState(viewportInitial ?? '');
  const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
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
              height: 100,
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EB423F',
              borderRadius: '50%',
            }}
          >
            <div>MARK</div>
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
