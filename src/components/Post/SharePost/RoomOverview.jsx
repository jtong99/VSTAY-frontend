import React from 'react';
import { useTranslation } from 'i18n';
import { Image } from 'react-bootstrap';
import BedSecondary from '@assets/img/post/bedSecondary.svg';
import Bills from '@assets/img/post/bills.svg';
import Toilet from '@assets/img/post/toilet.svg';
import Parking from '@assets/img/post/parking.svg';
import Money from '@assets/img/post/money.svg';
import {
  Bills as BillsEnum,
  RoomFurnishing,
  Parking as ParkingEnum,
  RoomToilet,
  LengthOfStay,
} from '@helper/enum';

function RoomOverview({
  overview: {
    furnishing,
    parking,
    toilets,
    bills,
    room_availability: { min_length_of_stay, max_length_of_stay },
  },
  price,
}) {
  const { t } = useTranslation(['topnav']);

  const billData = [
    { text: 'Include in rent', val: BillsEnum.INCLUDE_IN_RENT },
    { text: 'Some in rent', val: BillsEnum.SOME_IN_RENT },
    { text: 'Not in rent', val: BillsEnum.NOT_IN_RENT },
  ];
  const furnishSelect = [
    { text: 'Flexible', val: RoomFurnishing.FLEXIBLE },
    { text: 'Furnished', val: RoomFurnishing.FURNISHED },
  ];
  const toiletData = [
    { text: 'Shared', val: RoomToilet.SHARED },
    { text: 'Owned', val: RoomToilet.OWNED },
  ];
  const getLengthStay = () => {
    if (
      min_length_of_stay === LengthOfStay.UNLIMITTED &&
      min_length_of_stay === LengthOfStay.UNLIMITTED
    ) {
      return 'Unlimitted length of stay';
    }
    if (
      min_length_of_stay !== LengthOfStay.UNLIMITTED &&
      min_length_of_stay !== LengthOfStay.UNLIMITTED
    ) {
      return `${min_length_of_stay} months to ${max_length_of_stay} months`;
    }
    if (
      min_length_of_stay === LengthOfStay.UNLIMITTED &&
      min_length_of_stay !== LengthOfStay.UNLIMITTED
    ) {
      return `Minimum of stay is ${min_length_of_stay}`;
    }
    if (
      min_length_of_stay !== LengthOfStay.UNLIMITTED &&
      min_length_of_stay === LengthOfStay.UNLIMITTED
    ) {
      return `Maximum of stay is ${min_length_of_stay}`;
    }
    return '';
  };
  return (
    <div>
      <h4 style={{ fontWeight: 600 }}>{t('Room overview')}</h4>
      <h5 className="text-secondary">{t('Details')}</h5>
      <div>
        <div className="d-flex justify-content-between flex-wrap mt-4">
          <div>
            <Image src={Money} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              })}{' '}
              monthly rent
            </span>
          </div>
          <div>
            <Image src={Bills} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              Bills {billData.find((b) => b.val === bills).text}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-between flex-wrap mt-4">
          <div>
            <Image src={BedSecondary} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {furnishSelect.find((f) => f.val === furnishing).text} Rooms
            </span>
          </div>
          <div>
            <Image src={Parking} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              Parking {parking === ParkingEnum.YES ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-between flex-wrap mt-4">
          <div>
            <Image src={Toilet} />
            <span className="ml-2" style={{ fontWeight: 600 }}>
              {toiletData.find((t) => t.val === toilets).text} Toilet
            </span>
          </div>
          <div>
            <Image src={BedSecondary} />
            <span className="ml-4" style={{ fontWeight: 600 }}>
              {getLengthStay()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomOverview;
