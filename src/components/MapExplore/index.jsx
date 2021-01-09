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
import useAllNeed from '@hooks/api/useAllNeedPost';
import MarkShare from './MarkShare';
import PopUpShare from './PopUpShare';
import MarkNeed from './MarkNeed';
import PopUpNeed from './PopUpNeed';
import Loading from '@components/utils/Loading';
import Geocoder from 'react-mapbox-gl-geocoder';
import { Home } from 'react-feather';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function MapExploreComponent() {
  const router = useRouter();
  const [viewport, setViewport] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });

  const { data } = useAllShare();
  const { data: needGet } = useAllNeed();
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
  const geoStyle = {
    position: 'absolute',
    top: 42,
    right: '35%',

    width: 500,
  };
  const homeStyle = {
    position: 'absolute',
    top: 42,
    right: 20,
  };
  const shareData = data && data.result && data.result.resultArray;
  const needData =
    needGet &&
    needGet.code === 200 &&
    needGet.result &&
    needGet.result.total > 0 &&
    needGet.result.resultArray;
  const [popupData, setPopupData] = useState('');
  const [needPopupData, setNeedPopupData] = useState('');
  const queryParams = {
    country: 'vn',
  };
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
  useEffect(() => {
    if (needData) {
      let popup = [];
      for (let i = 0; i < needData.length; i++) {
        popup.push({ ...needData[i], show: false });
      }
      setNeedPopupData(popup);
    }
  }, [needData]);
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
  const onShowNeedPopUp = (index) => {
    let newPopup = [...needPopupData];
    console.log(needPopupData);
    for (let j = 0; j < newPopup.length; j++) {
      if (j === index) {
        newPopup[j].show = true;
      } else {
        newPopup[j].show = false;
      }
    }
    setNeedPopupData(newPopup);
  };
  const onCloseNeedPopUp = (index) => {
    let newPopup = [...needPopupData];
    console.log(needPopupData);
    for (let j = 0; j < newPopup.length; j++) {
      if (j === index) {
        newPopup[j].show = false;
        break;
      }
    }
    setNeedPopupData(newPopup);
  };
  const onSelected = (v, item) => {
    setViewport({ ...viewport, longitude: v.longitude, latitude: v.latitude });
  };
  if (data === '' || needGet === '') {
    return (
      <>
        <Loading show={true} />
      </>
    );
  }
  return (
    <div>
      {/* <button onClick={() => console.log(needData.length)}>click</button> */}
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
          // onClose={() => this.setState({sonShowNeedPopUphowPopup: false})}
          anchor="top"
        >
          <div>You are here</div>
        </Popup> */}
        {needData &&
          needData.map((n, i) => (
            <>
              <MarkNeed
                longitude={n.location.longitude}
                latitude={n.location.latitude}
                data={n}
                key={`item${i}`}
                onShow={() => onShowNeedPopUp(i)}
              />
            </>
          ))}
        {needPopupData !== '' &&
          needPopupData.map((p, i) => (
            <PopUpNeed
              longitude={p.location.longitude}
              latitude={p.location.latitude}
              key={`item${i}`}
              data={p}
              onClose={() => onCloseNeedPopUp(i)}
            />
          ))}
        {shareData &&
          shareData.map((r, i) => (
            <>
              <MarkShare
                longitude={r.address.geocode.longitude}
                latitude={r.address.geocode.latitude}
                data={r}
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

        <div style={geoStyle}>
          <Geocoder
            mapboxApiAccessToken={mapBoxToken}
            {...viewport}
            queryParams={queryParams}
            onSelected={onSelected}
          />
        </div>

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

        <div style={homeStyle}>
          <Button onClick={() => router.push('/')}>
            <Home />
          </Button>
        </div>
      </ReactMapGL>
    </div>
  );
}

export default MapExploreComponent;
