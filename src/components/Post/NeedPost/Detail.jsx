import React from 'react';
import style from './Need.module.scss';
import Dollars from '@assets/img/post/dollars.svg';
import Calendar from '@assets/img/post/calendar-need.svg';
import Suitcase from '@assets/img/post/suitcase.svg';
import { Image } from 'react-bootstrap';
import { formatDate } from 'helper/format';

function Detail({ budget, moveDate, lengthStay }) {
  return (
    <div className="py-4">
      <div style={{ paddingLeft: 30, paddingRight: 30 }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Image src={Dollars} width="35px" alt="dollars" />
            <div className="ml-4">
              <p className={`m-0 ${style.textIcon}`}>VND{budget}/mt</p>
              <p className="text-center m-0">Budget</p>
            </div>
          </div>
          <div className="d-flex">
            <Image src={Calendar} width="31px" alt="dollars" />
            <div className="ml-4">
              <p className={`m-0 ${style.textIcon}`}>{lengthStay} months</p>
              <p className="text-center m-0">Stay length</p>
            </div>
          </div>
          <div className="d-flex">
            <Image src={Suitcase} width="40px" alt="dollars" />
            <div className="ml-4">
              <p className={`m-0 ${style.textIcon}`}>{formatDate(moveDate)}</p>
              <p className="text-center m-0">Move date </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
