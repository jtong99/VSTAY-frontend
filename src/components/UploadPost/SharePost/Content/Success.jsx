import React from 'react';
import { useTranslation } from 'i18n';
import SuccessImg from '../../img/post-success.svg';
import { Image, Button } from 'react-bootstrap';
import Link from 'next/link';

function SuccessUpload() {
  const { t } = useTranslation(['topnav']);
  return (
    <div className="mt-5 text-center">
      <Image src={SuccessImg} width="70px" className="mb-5" />
      <h2>{t('Great! Your post is finished')}</h2>
      <p
        style={{
          width: '50%',
          margin: '0 auto',
          marginTop: 50,
        }}
      >
        {t(
          'You have already uploaded a post successfully. We will preview it and make it public for every one soon.',
        )}
      </p>
      <Link href="/">
        <Button variant="primary" className="mt-5">
          {t('Done')}
        </Button>
      </Link>
    </div>
  );
}

export default SuccessUpload;
