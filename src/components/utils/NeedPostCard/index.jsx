import React from 'react';
import { Image, Button } from 'react-bootstrap';
import CarouselImage from '../CarouselImages';
import style from './NeedPostCard.module.scss';
import { useTranslation } from 'i18n';
import { truncate } from '@helper/truncate';
import useUserById from '@hooks/api/useUserByUserId';
import Link from 'next/link';
import LazyImage from '@components/utils/LazyImage';

function NeedPostCard({ data }) {
  const { t } = useTranslation(['topnav']);
  //   const { data: profile } = useUserById(data.poster);

  return (
    <Link href={`/need-post?p=${data._id}`} passHref>
      <div className={style.wrapper}>
        <div>
          <div style={{ height: 200, backgroundColor: '#d1d1d1' }}>
            <LazyImage
              src={data.image}
              variant="avatar"
              height="200px"
              width="200px"
              style={{ margin: '0 auto' }}
            />
          </div>

          {/* <Image src={data.image} height="200px" /> */}
        </div>
        <div className="d-flex justify-content-between mt-2">
          <h5 className="font-weight-600">{data.about.name}</h5>
          <div>
            <div className={style.button}>{t('Free to message')}</div>
          </div>
        </div>
        <div className="d-flex  text-secondary mt-2">
          <p>
            {data.budget.toLocaleString('en-US', {
              style: 'currency',
              currency: 'VND',
            })}
            /month
          </p>
          <div className={style.dot} />
          <p>{data.about.age} years old</p>
        </div>
        <p className="text-secondary ">{truncate(data.description, 18)}</p>
      </div>
    </Link>
  );
}

export default NeedPostCard;
