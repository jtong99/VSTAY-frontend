import React from 'react';
import { Image, Button } from 'react-bootstrap';
import CarouselImage from '../CarouselImages';
import style from './PostCard.module.scss';
import { useTranslation } from 'i18n';
import { truncate } from '@helper/truncate';
import Home from './img/home.svg';
import Bathtub from './img/bathtub.svg';
import Bed from './img/bedroom.svg';
import Link from 'next/link';
import Height from '@assets/img/post/height-icon.svg';
import Width from '@assets/img/post/width-icon.svg';
import { PostType } from '@helper/enum';
import { formatDate } from 'helper/format';

function PostCard({ data }) {
  const { t } = useTranslation(['topnav']);

  return (
    <Link href={`/share-post?p=${data._id}`} passHref>
      <div className={style.wrapper}>
        <div>
          <CarouselImage images={data.images} imageHeight="200px" />
        </div>
        <div className="d-flex justify-content-between">
          <h5 className="font-weight-600">{truncate(data.title, 18)}</h5>
          <div>
            <div className={style.button}>{t('Free to message')}</div>
          </div>
        </div>
        <div className="d-flex justify-content-between text-secondary mt-2">
          <p>
            {data.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'VND',
            })}
            /month
          </p>
          <div className="d-flex ">
            {data.type === PostType.R_HOUSE ? (
              <>
                <div>
                  <Image src={Bed} height="18px" />
                  <span className="ml-1">{data.detail.total_bedrooms}</span>
                </div>
                <div className="ml-4">
                  <Image src={Bathtub} height="18px" />
                  <span className="ml-1">{data.detail.total_bathrooms}</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Image height="18px" src={Height} />
                  <span className="ml-1">{data.detail.height} (m)</span>
                </div>
                <div className="ml-4">
                  <Image height="18px" src={Width} />
                  <span className="ml-1">{data.detail.width} (m)</span>
                </div>
              </>
            )}

            <div className="ml-4">
              <Image src={Home} height="18px" />
              <span className="ml-1">{data.detail.max_people_live_with}</span>
            </div>
          </div>
        </div>
        <p className="text-secondary ">{data.address.name}</p>
        <p className="text-secondary">{formatDate(data.releasedAt, 'long')}</p>
      </div>
    </Link>
  );
}

export default PostCard;
