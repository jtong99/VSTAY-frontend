import React, { useState } from 'react';
import { Image, Badge, Button } from 'react-bootstrap';
import CarouselImage from '@components/utils/CarouselImages';
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
import { X } from 'react-feather';
import DialogConfirm from '@components/utils/DialogConfirm';
import EditBtn from './EditButton.jsx';
function PostCard({ data, onRemoveClick, onSuccessChange }) {
  const { t } = useTranslation(['topnav']);
  const [showDelDialog, setShowDelDialog] = useState(false);

  const status = [
    {
      value: 'approved',
      color: '#f5c000',
    },
    {
      value: 'pending',
    },
    {
      value: 'rejected',
    },
  ];
  const handleRemoveClick = async (e) => {
    const success = await onRemoveClick();
    if (success) {
      setShowDelDialog(false);
    }
  };
  const isEditable = data.status === 'pending';
  return (
    <>
      <div className={style.wrapper}>
        <div style={{ position: 'relative' }}>
          <div className={style.topright}>
            <Button variant="link" onClick={() => setShowDelDialog(!showDelDialog)}>
              <X />
            </Button>
          </div>
          {isEditable && (
            <div
              role="link"
              tabIndex={-1}
              style={{ visibility: 'hidden' }}
              className={`${style.overlay} conversion`}
            >
              <EditBtn data={data} onSuccessChange={onSuccessChange} />
            </div>
          )}
        </div>

        <Link href={`/share-post?p=${data._id}`} passHref>
          <div>
            <div>
              <CarouselImage images={data.images} imageHeight="200px" />
            </div>
            <div className="d-flex justify-content-between">
              <h5 className="font-weight-600">{truncate(data.title, 18)}</h5>
              <div>
                <Badge
                  variant="light"
                  className={`text-uppercase mb-1 mr-1 text-${
                    data.status === 'pending' ? 'warning' : 'danger'
                  } border border-${
                    data.status === 'pending' ? 'warning' : 'danger'
                  }`}
                  style={{
                    padding: '6px 8px',
                    fontSize: '0.8rem',
                    borderRadius: 5,
                  }}
                >
                  {data.status === 'rejected' && t('Rejected')}

                  {data.status === 'pending' && t('IN REVIEW')}
                </Badge>
                {/* <div className={style.button}>{data.status}</div> */}
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
                      <span className="ml-1">{data.detail.length} (m)</span>
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
            <p className="text-secondary">{formatDate(data.createdAt, 'long')}</p>
          </div>
        </Link>
      </div>

      {showDelDialog && (
        <DialogConfirm
          showModal={showDelDialog}
          onClose={() => setShowDelDialog(false)}
          title="Are you sure to remove this post?"
          onFire={handleRemoveClick}
        />
      )}
    </>
  );
}

export default PostCard;
