import React from 'react';
import { useTranslation } from 'i18n';
import style from './Need.module.scss';
import { Image } from 'react-bootstrap';
import Bath from '@assets/img/post/bathtub.svg';
import Bed from '@assets/img/post/bed.svg';
import User from '@assets/img/post/user.svg';
import Wifi from '@assets/img/post/wifi.svg';

function Preference({
  data: { max_people_live_with, toilets, internet, furnishing },
}) {
  const { t } = useTranslation(['topnav']);
  return (
    <div className="py-2">
      <div>
        <h4 style={{ fontWeight: 600 }}>{t('Property preferences')}</h4>
        <p
          style={{ letterSpacing: 2, fontSize: '.875rem', margin: '2rem 0 1.5rem' }}
        >
          {t('DETAILS')}
        </p>
        <div className="d-flex justify-content-between mt-4">
          <div
            className={`mt-3 d-flex justify-content-start`}
            style={{
              width: '50%',
              flexGrow: 1,
            }}
          >
            <Image src={Bath} alt="icon" className="d-block" />
            <h6 className="ml-4 mt-2">{t('Toilet')}</h6>

            <h6
              className="ml-4 mt-2"
              style={{
                fontWeight: 600,
                minWidth: '90px',
                textTransform: 'capitalize',
              }}
            >
              {toilets}
            </h6>
          </div>
          <div
            className={`mt-3 d-flex justify-content-end`}
            style={{
              width: '50%',
              flexGrow: 1,
            }}
          >
            <Image src={Bed} alt="icon" className="d-block" />
            <h6 className="ml-4 mt-2">{t('Furnish')}</h6>

            <h6
              className="ml-4 mt-2"
              style={{
                fontWeight: 600,
                minWidth: '90px',
                textTransform: 'capitalize',
              }}
            >
              {furnishing}
            </h6>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <div
            className={`mt-3 d-flex justify-content-start`}
            style={{
              width: '50%',
              flexGrow: 1,
            }}
          >
            <Image src={User} width="30px" alt="icon" className="d-block" />
            <h6 className="ml-4 mt-2">{t('Max people live with')}</h6>

            <h6 className="ml-4 mt-2" style={{ fontWeight: 600, minWidth: '90px' }}>
              {max_people_live_with}
            </h6>
          </div>
          <div
            className={`mt-3 d-flex justify-content-end`}
            style={{
              width: '50%',
              flexGrow: 1,
            }}
          >
            <Image src={Wifi} width="30px" alt="icon" className="d-block" />
            <h6 className="ml-4 mt-2">{t('Internet')}</h6>

            <h6
              className="ml-4 mt-2"
              style={{
                fontWeight: 600,
                minWidth: '90px',
                textTransform: 'capitalize',
              }}
            >
              {internet}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preference;
