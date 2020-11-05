import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  FlyToInterpolator,
  Marker,
} from 'react-map-gl';
import { Button, Modal, Image } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import { mapBoxToken } from '@helper/vars';
import useDataFromGeocode from '@hooks/api/useDataFromGeocode';
import MarkImg from './img/mark.svg';

function MapModalSelectAddress({ show, onFinish, dismiss }) {
  const { t } = useTranslation(['topnav']);
  const [markers, setMarkers] = useState('');
  const [addressName, setAddressName] = useState('');
  const [viewport, setViewport] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 10,
  });
  const getAddressName = ({ features }) => {
    return features[2].place_name;
  };
  const handleClick = async (e) => {
    const longitude = e.lngLat[0];
    const latitude = e.lngLat[1];
    const data = await useDataFromGeocode({ longitude, latitude });
    // console.log(getAddressName(data));
    setAddressName(getAddressName(data));
    setMarkers({ longitude, latitude });
    // console.log('long', longitude);
    // console.log('lat', latitude);
  };
  const handleChangeViewport = (value) => {
    setViewport({ ...value, width: '100vw', height: '100vh' });
  };
  const onDoneSelectAddress = () => {
    onFinish(viewport.longitude, viewport.latitude, addressName);
    dismiss();
  };
  return (
    <>
      <Modal
        scrollable
        backdrop="static"
        show={show}
        onHide={dismiss}
        size="lg"
        centered
      >
        <Modal.Header
          // style={{ padding: '5px 10px 5px 0px', borderBottom: 'none' }}
          closeButton
        >
          <Modal.Title>Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <button onClick={() => console.log(viewport)}>click</button> */}
          <h3>{addressName}</h3>
          <div style={{ width: '100%', height: 500 }}>
            <ReactMapGL
              {...viewport}
              width="100%"
              height="100%"
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken={mapBoxToken}
              onViewportChange={handleChangeViewport}
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
              <div
                style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}
              >
                <div className="mb-3">
                  <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    showUserLocation={true}
                    auto={true}
                  />
                </div>
                <NavigationControl
                  onViewportChange={(viewport) => setViewport(viewport)}
                />
              </div>
            </ReactMapGL>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button onClick={onDoneSelectAddress} variant="true-green">
              {t('Done')}
            </Button>

            {/* <Button className="btn-primary" style={{ borderRadius: '3px' }}>
              {t('common:No')}
            </Button> */}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MapModalSelectAddress;
