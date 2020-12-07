import React from 'react';
import { Marker } from 'react-map-gl';
import MarkImg from '@assets/img/location_need.svg';
import { Image, Button } from 'react-bootstrap';

function MarkNeed({ longitude, latitude, onShow, data }) {
  return (
    <>
      <>
        <Marker
          longitude={longitude}
          latitude={latitude}
          offsetTop={-30}
          offsetLeft={-15}
        >
          <div
            style={{
              height: 30,
              width: 30,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button variant="link" onClick={onShow}>
              <Image src={MarkImg} width="50px" height="50px" />
            </Button>

            {/* <Image src={MarkImg} width="100%" height="100%" /> */}
          </div>
        </Marker>
      </>
    </>
  );
}

export default MarkNeed;
