import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  FlyToInterpolator,
  Marker,
  Popup,
} from 'react-map-gl';
import { mapBoxToken } from '@helper/vars';
import useAllShare from '@hooks/api/useAllSharePost';
import MarkShare from './MarkShare';
import PopUpShare from './PopUpShare';

function MapExploreComponent() {
  const [viewport, setViewport] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });

  const { data } = useAllShare();
  const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
  };
  const navStyle = {
    position: 'absolute',
    top: 72,
    left: 0,
    padding: '10px',
  };
  const shareData = data && data.result && data.result.resultArray;
  const [popupData, setPopupData] = useState('');
  useEffect(() => {
    if (shareData) {
      console.log('load share data');
      let popup = [];
      for (let i = 0; i < shareData.length; i++) {
        popup.push({ ...shareData[i], show: false });
      }
      setPopupData(popup);
    }
  }, [shareData]);
  const onShowPopUp = (index) => {
    let newPopup = [...popupData];
    console.log(popupData);
    for (let j = 0; j < newPopup.length; j++) {
      if (j === index) {
        newPopup[j].show = true;
      } else {
        newPopup[j].show = false;
      }
    }
    setPopupData(newPopup);
  };
  const onClosePopUp = (index) => {
    let newPopup = [...popupData];
    console.log(popupData);
    for (let j = 0; j < newPopup.length; j++) {
      if (j === index) {
        newPopup[j].show = false;
        break;
      }
    }
    setPopupData(newPopup);
  };
  if (popupData === '') {
    return <div>loading</div>;
  }
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={mapBoxToken}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        transitionInterpolator={new FlyToInterpolator()}
        // onClick={handleClick}
      >
        {/* <Popup
          latitude={10.045995900840246}
          longitude={105.7846671000007}
          closeButton={true}
          closeOnClick={false}
          // onClose={() => this.setState({showPopup: false})}
          anchor="top"
        >
          <div>You are here</div>
        </Popup> */}
        {shareData &&
          shareData.map((r, i) => (
            <>
              <MarkShare
                longitude={r.address.geocode.longitude}
                latitude={r.address.geocode.latitude}
                key={`item${i}`}
                onShow={() => onShowPopUp(i)}
              />
            </>
          ))}
        {popupData !== '' &&
          popupData.map((p, i) => (
            <PopUpShare
              longitude={p.address.geocode.longitude}
              latitude={p.address.geocode.latitude}
              key={`item${i}`}
              data={p}
              onClose={() => onClosePopUp(i)}
            />
          ))}
        <div style={navStyle}>
          <NavigationControl
            style={geolocateStyle}
            onViewportChange={(viewport) => setViewport(viewport)}
          />
        </div>
        <div style={geolocateStyle}>
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserLocation={true}
            auto={true}
          />
        </div>
      </ReactMapGL>
    </div>
  );
}

export default MapExploreComponent;
