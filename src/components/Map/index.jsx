import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  FlyToInterpolator,
  Marker,
} from 'react-map-gl';
import Geocoder from 'react-mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import dynamic from 'next/dynamic';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

function MapComponent() {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2hhbmVlMTk5OCIsImEiOiJja2dxYnloMjYwMm95MnltZjM2dmg2YXp4In0.K8QHOI_y9wSPk0NjCxL30w';
  const mapRef = React.createRef();
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
    console.log('long', longitude);
    console.log('lat', latitude);
  };

  // useEffect(() => {
  //   const map = new mapboxgl.Map({
  //     container: mapRef.current,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [viewport.longitude, viewport.latitude],
  //     zoom: viewport.zoom,
  //   });

  //   map.on('move', () => {
  //     setViewport({
  //       ...viewport,
  //       longitude: map.getCenter().lng.toFixed(4),
  //       latitude: map.getCenter().lat.toFixed(4),
  //       zoom: map.getZoom().toFixed(2),
  //     });
  //   });
  //   map.addControl(
  //     new mapboxgl.GeolocateControl({
  //       positionOptions: {
  //         enableHighAccuracy: true,
  //       },
  //       trackUserLocation: true,
  //     }),
  //   );
  //   map.on('click', (e) => {
  //     console.log(e);
  //     setMarkers((markers) => [...markers, { longitude, latitude }]);
  //   });
  // }, []);

  const onClickMap = (map) => {
    console.log(map);
    console.log(map.lngLat[1]);
    setViewMark({
      latitude: parseFloat(map.lngLat[0]),
      longitude: parseFloat(map.lngLat[1]),
    });
    // setViewport({ ...viewport, latitude: map.lngLat[0], longitude: map.lngLat[1] });
  };
  const mapAccess = {
    mapboxApiAccessToken:
      'pk.eyJ1Ijoic2hhbmVlMTk5OCIsImEiOiJja2dxYnloMjYwMm95MnltZjM2dmg2YXp4In0.K8QHOI_y9wSPk0NjCxL30w',
  };
  const onSelect = (viewport, item) => {
    setViewport(viewport);
    console.log('Selected: ', item);
  };
  const queryParams = {
    country: 'vn',
  };
  return (
    <div>
      <button onClick={() => console.log(viewMark)}>click</button>
      <div>Longtitude: {viewport.longitude}</div>
      <div>latitude: {viewport.latitude}</div>
      <div>zoom: {viewport.zoom}</div>
      <div style={{ width: '100%', height: 500, position: 'relative' }}>
        {/* <div
          ref={mapRef}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        /> */}
        <Geocoder
          mapboxApiAccessToken="pk.eyJ1Ijoic2hhbmVlMTk5OCIsImEiOiJja2dxYnloMjYwMm95MnltZjM2dmg2YXp4In0.K8QHOI_y9wSPk0NjCxL30w"
          {...viewport}
          hideOnSelect={true}
          queryParams={queryParams}
          onSelected={onSelect}
        />
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
