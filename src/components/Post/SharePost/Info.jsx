import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import Bathtub from '@assets/img/post/bathtub.svg';
import Bed from '@assets/img/post/bed.svg';
import Home from '@assets/img/post/home.svg';
import Height from '@assets/img/post/height-icon.svg';
import Width from '@assets/img/post/width-icon.svg';
import { PostType } from '@helper/enum';
function Info({
  title,
  postType,
  detail: { total_bedrooms, total_bathrooms, max_people_live_with, width, length },
  price,
  address,
}) {
  const { t } = useTranslation(['topnav']);
  const type = [
    { text: 'Room(s) in boarding house', val: PostType.S_ROOM },
    { text: 'Room(s) in your house', val: PostType.S_HOUSE },
    { text: 'Whole property renting', val: PostType.R_HOUSE },
  ];
  return (
    <>
      <h4>{title}</h4>
      <div className="d-flex mt-4">
        <div
          style={{
            backgroundColor: '#FFDEDE',
            padding: '5px 8px 5px 8px',
            border: '1px solid #B6B6B6',
            borderRadius: 5,
            fontWeight: 600,
          }}
        >
          {t('Free to contact')}
        </div>
        <div>
          <p
            style={{
              fontWeight: 600,
              marginLeft: 20,
              marginBottom: 0,
              marginTop: 5,
            }}
          >
            {type.find((t) => t.val === postType).text}
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="d-flex">
        <div
          style={{
            backgroundColor: '#FFDEDE',
            padding: '3px 15px 3px 15px',
            border: '1px solid #B6B6B6',
            textAlign: 'center',
          }}
        >
          <div className="mt-2">
            <span style={{ fontWeight: 600, fontSize: 20 }}>
              {price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
            <span
              className="text-secondary"
              style={{ fontWeight: 600, fontSize: 15 }}
            >
              /mt
            </span>
          </div>
          <p>{t('With bills')}</p>
        </div>
        <div className="d-flex pt-4 pl-4">
          {postType === PostType.R_HOUSE ? (
            <>
              <div>
                <Image src={Bed} />
                <span className="ml-1">{total_bedrooms}</span>
              </div>
              <div className="ml-4">
                <Image src={Bathtub} />
                <span className="ml-1">{total_bathrooms}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <Image width="31px" src={Height} />
                <span className="ml-1">{length} (m)</span>
              </div>
              <div className="ml-4">
                <Image width="31px" src={Width} />
                <span className="ml-1">{width} (m)</span>
              </div>
            </>
          )}
          <div className="ml-4">
            <Image src={Home} />
            <span className="ml-1">{max_people_live_with}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="font-weight-bold">{t('Address')}:</span>
        {'  '}
        {address}
      </div>
    </>
  );
}

export default Info;
