import React from 'react';
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

function NeedPostComponent({ data }) {
  const { data: userData } = useCurrentUserData();
  const { user } = userData || {};
  //   const images = [
  //     'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  //     'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  //     'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  //     'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
  //   ];
  return (
    <div>
      <div className={style.imageWrapper}>
        <LazyImage
          className="rounded-circle overflow-hidden dc-ava-profile-other img-ava"
          variant="avatar"
          src={(user && user.avatar) || ''}
          height={200}
          width={200}
        />
        {/* <Image
          src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          className={style.avatar}
        /> */}
      </div>
      <button onClick={() => console.log(data)}>click</button>
      <Container className="mb-5 pt-4">
        <Row>
          <Col lg={8}>
            <Info data={data.about} />
            <hr className="my-4" />
            <Detail
              budget={data.budget}
              lengthStay={data.length_of_stay}
              moveDate={data.move_date}
            />
            <hr className="my-4" />
            <About
              description={data.description}
              features={data.employmentDisplay}
              lifeStyle={data.lifeStyleDisplay}
            />
            <hr className="my-4" />
            <Preference data={data.detail} />
          </Col>
          <Col lg={4}>
            <Contact />
          </Col>
        </Row>
      </Container>
      <MapPreview address={data.address} />
    </div>
  );
}

export default NeedPostComponent;
