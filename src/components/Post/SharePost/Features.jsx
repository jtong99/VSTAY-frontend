import React from 'react';
import { useTranslation } from 'i18n';
import { Image } from 'react-bootstrap';

function Features({ features }) {
  const { t } = useTranslation(['topnav']);

  return (
    <div className="mb-4">
      <h4 style={{ fontWeight: 600 }}>{t('Features')}</h4>
      <div className="d-flex justify-content-between flex-wrap mt-4">
        {features &&
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
          ))}
      </div>
      {/* <div
        className={`${
          features.includes(featuresData[0].value) &&
          features.includes(featuresData[1].value)
            ? 'd-flex justify-content-between mt-4'
            : 'd-none'
        } `}
      >
        {featuresData.slice(0, 2).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div> */}
      {/* <div
        className={`${
          features.includes(featuresData[2].value) &&
          features.includes(featuresData[3].value)
            ? 'd-flex justify-content-between mt-4'
            : 'd-none'
        } `}
      >
        {featuresData.slice(2, 4).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div> */}
      {/* <div
        className={`${
          features.includes(featuresData[4].value) &&
          features.includes(featuresData[5].value)
            ? 'd-flex justify-content-between mt-4'
            : 'd-none'
        } `}
      >
        {featuresData.slice(4, 6).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
      <div
        className={`${
          features.includes(featuresData[6].value) &&
          features.includes(featuresData[7].value)
            ? 'd-flex justify-content-between mt-4'
            : 'd-none'
        } `}
      >
        {featuresData.slice(6, 8).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>
      <div
        className={`${
          features.includes(featuresData[8].value) &&
          features.includes(featuresData[9].value)
            ? 'd-flex justify-content-between mt-4'
            : 'd-none'
        } `}
      >
        {featuresData.slice(8, 10).map((f, i) => (
          <div style={{ display: features.includes(f.value) ? 'inherit' : 'none' }}>
            <Image src={f.icon} />
            <span className="ml-3" style={{ fontWeight: 600 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Features;
