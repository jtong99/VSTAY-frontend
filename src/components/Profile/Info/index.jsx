import React, { useState } from 'react';
import { Edit3, Key, Trash2 } from 'react-feather';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'i18n';
import UpdateProfile from './UpdateProfile';
import ChangePwd from './ChangePwd';

function InfoComponent({ data }) {
  const { t } = useTranslation(['profile']);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  return (
    <>
      <div>
        <h6 style={{ fontWeight: 300, fontSize: 29, marginLeft: 7 }}>
          {data && data.name}
        </h6>
        <div className="mt-3 d-flex flex-wrap">
          <Button
            onClick={() => setShowUpdate(!showUpdate)}
            variant=""
            style={{ border: '1px solid #E0E0E0' }}
            className="bg-white"
          >
            <Edit3 height={20} />
            &nbsp;&nbsp;&nbsp; {t('Edit Profile')}
          </Button>
          <Button
            onClick={() => setShowChangePwd(!showChangePwd)}
            variant=""
            style={{ border: '1px solid #E0E0E0' }}
            className="ml-2 bg-white"
          >
            <Key height={20} />
            &nbsp;&nbsp;&nbsp; {t('Change Password')}
          </Button>
        </div>
        <p style={{ fontSize: 15 }} className="text-primary mt-3">
          {data && data.email}
        </p>
        <p>
          <strong>{data && data.headline}</strong>
        </p>
      </div>
      <UpdateProfile show={showUpdate} handleClose={() => setShowUpdate(false)} />
      <ChangePwd show={showChangePwd} handleClose={() => setShowChangePwd(false)} />
    </>
  );
}

export default InfoComponent;
