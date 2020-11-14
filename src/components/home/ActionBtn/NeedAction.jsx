import React, { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import style from './Need.module.scss';
import NeedBtn from '@assets/img/post/needBtn.svg';
import { useRouter } from 'next/router';
import AuthContext from '@components/Auth/AuthContext';

function NeedAction() {
  const { isAuth } = useContext(AuthContext);
  const router = useRouter();
  const { t } = useTranslation(['signin']);
  return (
    <Button
      onClick={() =>
        router.push(
          isAuth ? '/upload-post?t=need' : `/sign-in?ref=upload-post?t=need`,
        )
      }
      variant="link"
      style={{ textDecoration: 'none', textAlign: 'inherit' }}
    >
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
            <div className={style.button}>{t('Get started!')}</div>
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