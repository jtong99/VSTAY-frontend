import React from 'react';
import { Image, Button } from 'react-bootstrap';
import CarouselImage from '../CarouselImages';
import style from './NeedPostCard.module.scss';
import { useTranslation } from 'i18n';
import { truncate } from '@helper/truncate';
import useUserById from '@hooks/api/useUserByUserId';
import Link from 'next/link';

function NeedPostCard({ data }) {
  const { t } = useTranslation(['topnav']);
  //   const { data: profile } = useUserById(data.poster);

  return (
    <Link href={`/need-post?p=${data._id}`} passHref>
      <div className={style.wrapper}>
        <div>
          <Image src={data.image} height="200px" />
        </div>
        <div className="d-flex justify-content-between">
          <h5 className="font-weight-600">{data.about.name}</h5>
          <div>
            <div className={style.button}>{t('Free to message')}</div>
          </div>
        </div>
        <div className="d-flex justify-content-between text-secondary mt-2">
          <p>
            {data.budget.toLocaleString('en-US', {
              style: 'currency',
              currency: 'VND',
            })}
            /month
          </p>
          <p>{data.about.age}</p>
        </div>
        <p className="text-secondary ">{truncate(data.description, 18)}</p>
      </div>
    </Link>
  );
}

export default NeedPostCard;
