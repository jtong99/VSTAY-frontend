import React, { useState } from 'react';
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  FlyToInterpolator,
  Marker,
} from 'react-map-gl';

function MapComponent() {
  const [viewport, setViewport] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });
  const [viewMark, setViewMark] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
  });
  const params = {
    country: 'vi',
  };
  const [markers, setMarkers] = useState([]);
  const handleClick = ({ lngLat: [longitude, latitude] }) => {
    setMarkers((markers) => [...markers, { longitude, latitude }]);
    console.log(longitude);
  };
  const onClickMap = (map) => {
    console.log(map);
    console.log(map.lngLat[1]);
    setViewMark({
      latitude: parseFloat(map.lngLat[0]),
      longitude: parseFloat(map.lngLat[1]),
    });
    // setViewport({ ...viewport, latitude: map.lngLat[0], longitude: map.lngLat[1] });
  };
  return (
    <div>
      <button onClick={() => console.log(viewMark)}>click</button>
      <div style={{ width: '100%', height: 100 }}>
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1Ijoic2hhbmVlMTk5OCIsImEiOiJja2dxYnloMjYwMm95MnltZjM2dmg2YXp4In0.K8QHOI_y9wSPk0NjCxL30w"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
          transitionInterpolator={new FlyToInterpolator()}
          onClick={handleClick}
        >
          {markers.map((m, i) => (
            <Marker {...m} key={i}>
              mark
            </Marker>
          ))}
          <NavigationControl
            onViewportChange={(viewport) => setViewport(viewport)}
          />
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserLocation={true}
            auto={true}
          />
          testing
        </ReactMapGL>
      </div>
    </div>
  );
}

export default MapComponent;
