import React, { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import style from './Share.module.scss';
import ShareBtn from '@assets/img/post/shareBtn.svg';
import { useRouter } from 'next/router';
import AuthContext from '@components/Auth/AuthContext';

function ShareAction() {
  const { isAuth } = useContext(AuthContext);
  const router = useRouter();
  const { t } = useTranslation(['signin']);
  return (
    <Button
      variant="link"
      onClick={() =>
        router.push(
          isAuth ? '/upload-post?t=share' : `/sign-in?ref=upload-post?t=share`,
        )
      }
      style={{ textDecoration: 'none', textAlign: 'inherit' }}
    >
      <div className={`text-dark ${style.wrapperShare}`}>
        <h4 className="text-center" style={{ fontWeight: 600 }}>
          {t('Share/Lease accommodation')}
        </h4>
        <p className={`${style.description} text-left`}>
          {t(
            'Create an attractive list for youself, for your customers to find you.',
          )}
        </p>
        <div className="d-flex justify-content-between">
          <div>
            <Image src={ShareBtn} width="300px" alt="need" />
          </div>
          <div>
            <div className={style.button}>{t("Let's do it!")}</div>
          </div>
        </div>
      </div>
    </Button>
  );
}

export default ShareAction;
