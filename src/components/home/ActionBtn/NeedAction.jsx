import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import style from './Need.module.scss';
import NeedBtn from '@assets/img/post/needBtn.svg';

function NeedAction() {
  const { t } = useTranslation(['signin']);
  return (
    <Button variant="link" style={{ textDecoration: 'none', textAlign: 'inherit' }}>
      <div className={`text-dark ${style.wrapper}`}>
        <h4 className="text-center" style={{ fontWeight: 600 }}>
          {t('I need accommodation')}
        </h4>
        <p className={`${style.description} text-left`}>
          {t(
            'Create a beautiful V-post about your requirements and we will do the rest.',
          )}
        </p>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              variant="pink-whiter"
              style={{ fontWeight: 600, marginTop: '2rem' }}
              className="text-dark"
            >
              {t('Get started!')}
            </Button>
          </div>
          <div>
            <Image src={NeedBtn} alt="need" />
          </div>
        </div>
      </div>
    </Button>
  );
}

export default NeedAction;
