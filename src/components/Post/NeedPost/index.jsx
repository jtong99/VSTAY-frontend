import React, { useContext, useCallback, useEffect } from 'react';
import { Button, Image, Container, Row, Col } from 'react-bootstrap';
import style from './Need.module.scss';
import Info from './Info';
import Detail from './Detail';
import About from './About';
import Preference from './Preference';
import MapPreview from './MapPreview';
import Contact from './Contact';
import LazyImage from '@components/utils/LazyImage';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import useFetch from '@hooks/useFetch';
import AuthContext from '@components/Auth/AuthContext';

function NeedPostComponent({ data }) {
  const { data: userData } = useCurrentUserData();
  const { user } = userData || {};
  //   const images = [
  //     'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  //     'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  //     'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  //     'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
  //   ];
  const { getToken } = useContext(AuthContext);
  const [pushView] = useFetch(`/v1/api/view/${data && data._id}?type=need`, {
    token: getToken(),
    method: 'POST',
  });
  const onLeaving = useCallback(
    ({ currentTime }) => {
      if (currentTime > 30) {
        pushView({ watchingTime: currentTime });
      }
    },
    [data._id, pushView],
  );

  useEffect(() => {
    const enterTime = Date.now();
    const handleLeaving = () => {
      const duration = Math.round((Date.now() - enterTime) / 1000);
      if (onLeaving) {
        onLeaving({
          currentTime: duration,
        });
      }
    };
    window.addEventListener('beforeunload', handleLeaving);
    return () => {
      handleLeaving();
      window.removeEventListener('beforeunload', handleLeaving);
    };
  }, [onLeaving]);
  return (
    <div>
      <div className={style.imageWrapper}>
        <LazyImage
          className={`rounded-circle overflow-hidden ${style.avatar}`}
          variant="avatar"
          src={(user && user.avatar) || ''}
          height={300}
          width={300}
        />
        {/* <Image src={(user && user.avatar) || ''} className={style.avatar} /> */}
      </div>

      <Container className="mb-5 pt-4">
        <Row>
          <Col lg={8}>
            <Info data={data && data.about} />
            <hr className="my-4" />
            <Detail
              budget={data.budget}
              lengthStay={data.length_of_stay}
              moveDate={data.move_date}
            />
            <hr className="my-4" />
            <About
              description={data.description}
              features={data.employment_status}
              lifeStyle={data.life_style}
            />
            <hr className="my-4" />
            <Preference data={data.detail} />
          </Col>
          <Col lg={4}>
            <Contact id={data.poster ?? ''} />
          </Col>
        </Row>
      </Container>
      <MapPreview address={data.location} />
    </div>
  );
}

export default NeedPostComponent;
