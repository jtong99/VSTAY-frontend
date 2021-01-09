import React, { useState } from 'react';
import { Image, Badge, Button } from 'react-bootstrap';
import { X } from 'react-feather';
import style from './NeedPostCard.module.scss';
import { useTranslation } from 'i18n';
import { truncate } from '@helper/truncate';
import useUserById from '@hooks/api/useUserByUserId';
import Link from 'next/link';
import LazyImage from '@components/utils/LazyImage';
import EditBtn from './EditButton.jsx';
import DialogConfirm from '@components/utils/DialogConfirm';

function NeedPostCard({ data, onRemoveClick }) {
  const { t } = useTranslation(['topnav']);
  const { data: profile } = useUserById(data.poster);
  const [showDelDialog, setShowDelDialog] = useState(false);
  const isEditable = true;
  const handleRemoveClick = async (e) => {
    const success = await onRemoveClick();
    if (success) {
      setShowDelDialog(false);
    }
  };
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
              <EditBtn data={data} onSuccessChange={() => {}} />
            </div>
          )}
        </div>
        <Link href={`/need-post?p=${data._id}`} passHref>
          <div>
            <div>
              <div
                className={style.img}
                style={{ height: 200, backgroundColor: '#d1d1d1' }}
              >
                <LazyImage
                  src={profile && profile.user && profile.user.avatar}
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

export default NeedPostCard;
