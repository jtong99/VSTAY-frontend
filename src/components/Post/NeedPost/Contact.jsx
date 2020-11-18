import React from 'react';
import style from './Need.module.scss';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import LazyImage from '@components/utils/LazyImage';
import { socialIcons } from '@helper/social';
import { useTranslation } from 'i18n';

function Contact() {
  const { data } = useCurrentUserData();
  const { user } = data || {};
  const { t } = useTranslation(['topnav']);
  return (
    <div className={style.wrapperContact}>
      <div
        className="d-flex justify-content-center align-items-center"
        // style={{ width: '80%', margin: '0 auto' }}
      >
        <LazyImage
          className="rounded-circle overflow-hidden dc-ava-profile-other img-ava"
          variant="avatar"
          src={(user && user.avatar) || ''}
          height={100}
          width={100}
        />
        <div className="ml-3 mt-3">
          <h4 className="font-weight-600">{(user && user.name) || ''}</h4>
          <p className="text-secondary">Online today</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="font-weight-600">{t('Social media')}</p>
        {user && user.social
          ? Object.keys(user.social).map((element) => {
              const IconComponent = socialIcons[element] || socialIcons.default;
              return (
                <a
                  key={element}
                  href={user.social[element]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={user.social[element] !== '' ? '' : 'text-secondary'}
                  style={{
                    marginRight: 18,
                    pointerEvents: user.social[element] !== '' ? 'inherit' : 'none',
                  }}
                >
                  <IconComponent />
                </a>
              );
            })
          : 'test'}
      </div>
    </div>
  );
}

export default Contact;
