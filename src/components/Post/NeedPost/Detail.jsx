import React from 'react';
import style from './Need.module.scss';
import Dollars from '@assets/img/post/dollars.svg';
import Calendar from '@assets/img/post/calendar-need.svg';
import Suitcase from '@assets/img/post/suitcase.svg';
import { Image } from 'react-bootstrap';

function Detail() {
  return (
    <div className="py-4">
      <div style={{ paddingLeft: 30, paddingRight: 30 }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Image src={Dollars} width="35px" alt="dollars" />
            <div className="ml-4">
              <p className={`m-0 ${style.textIcon}`}>$100/mt</p>
              <p className="text-center m-0">Budget</p>
            </div>
          </div>
          <div className="d-flex">
            <Image src={Calendar} width="31px" alt="dollars" />
            <div className="ml-4">
              <p className={`m-0 ${style.textIcon}`}>6 months</p>
              <p className="text-center m-0">Stay length</p>
            </div>
          </div>
          <div className="d-flex">
            <Image src={Suitcase} width="40px" alt="dollars" />
            <div className="ml-4">
              <p className={`m-0 ${style.textIcon}`}>20 Nov</p>
              <p className="text-center m-0">Move date </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
