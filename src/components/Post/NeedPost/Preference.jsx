import React from 'react';
import { useTranslation } from 'i18n';
import style from './Need.module.scss';
import { Image } from 'react-bootstrap';
import Bath from '@assets/img/post/bathtub.svg';

function Preference() {
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
        <div className="d-flex justify-content-between flex-wrap mt-4">
          <div
            className={`mt-3 d-flex justify-content-start`}
            style={{
              width: '50%',
              flexGrow: 1,
            }}
          >
            <Image src={Bath} alt="icon" className="d-block" />
            <h6 className="ml-4 mt-2">Bathroom</h6>

            <h6 className="ml-4 mt-2" style={{ fontWeight: 600, minWidth: '90px' }}>
              Flexible
            </h6>
          </div>
          {/* {features &&
          features.map((f, i) => (
            <div
              className={`mt-3 d-flex justify-content-${
                i % 2 !== 0 ? 'end' : 'start'
              }`}
              style={{
                width: '50%',
                flexGrow: 1,
              }}
            >
              <Image src={f.icon} alt="icon" className="d-block" />

              <h6
                className="ml-4 mt-2"
                style={{ fontWeight: 600, minWidth: '90px' }}
              >
                {f.text}
              </h6>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Preference;
