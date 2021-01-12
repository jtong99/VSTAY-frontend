import React from 'react';
import LazyImage from '@components/utils/LazyImage';
import { socialIcons } from '@helper/social';
import { useTranslation } from 'i18n';
import getLastActivity from '@helper/getLastActivity';
import useUserById from '@hooks/api/useUserByUserId';
import { Button } from 'react-bootstrap';
import useCurrentUser from '@hooks/api/useCurrentUserData';

function Contact({ id, onShowChat }) {
  const { data } = useUserById(id);
  const { data: userData } = useCurrentUser();

  const user = data && data.user;
  const currentUser = userData && userData.user;
  const { t } = useTranslation(['topnav']);

  if (!data || !userData) {
    return <div></div>;
  }
  return (
    <div style={{ border: '1px solid #e3e4e5', padding: '40px', marginTop: '2rem' }}>
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
          <p className="text-secondary">{getLastActivity(user.lastActivity)}</p>
        </div>
      </div>
      <Button
        disabled={currentUser._id === user._id}
        style={{ width: '70%', margin: '20px auto' }}
        onClick={onShowChat}
        block
      >
        {t('Send message')}
      </Button>
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
