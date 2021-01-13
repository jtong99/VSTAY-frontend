import React from 'react';
import style from './Need.module.scss';
import { useTranslation } from 'i18n';
import { PostType } from '@helper/enum';

function Info({ data, propertyType, address }) {
  const { t } = useTranslation(['topnav']);
  const typePostShow = [
    { type: 'share_room', text: 'This user need a shared room' },
    {
      S_HOUSE: 'share_room_in_house',
      text: 'This user need to rent a room in house',
    },
    { N_ROOM: 'need_room', text: 'This user need to rent a room in house' },
    { N_HOUSE: 'need_house' },
    {
      R_HOUSE: 'share_whole_property',
      text: 'This user need to rent whole property',
    },
  ];

  return (
    <div>
      <div className="d-flex">
        {/* <div>
          <div className={style.tags}>Newbie</div>
        </div> */}
        <h2>{data.name}</h2>
        <p className={style.tagsText}>({`${data.age} years old ${data.gender}`})</p>
      </div>
      <p>
        <span className="text-danger">*</span>{' '}
        {propertyType && (
          <span className="text-secondary text-italic">
            {typePostShow.filter((t) => t.type === propertyType)[0].text} near{' '}
            {address}
          </span>
        )}
      </p>
    </div>
  );
}

export default Info;
