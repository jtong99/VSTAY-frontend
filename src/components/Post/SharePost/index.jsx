import React from 'react';
import { Button, Image, Container, Row, Col } from 'react-bootstrap';
import CarouselImage from '@components/utils/CarouselImages';
import Info from './Info';
import About from './About';
import RoomOverview from './RoomOverview';
import Features from './Features';
import useCurrentUserData from '@hooks/api/useCurrentUserData';
import Contact from './Contact';
import MapPreview from './MapPreview';

function PostComponent({
  data: { images, description, detail, price, title, type, features, address },
}) {
  const { data: userData } = useCurrentUserData();
  const { user } = userData || {};
  //   const images = [
  //     'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  //     'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  //     'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  //     'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
  //   ];
  const addressValue = {
    longitude: address.geocode.longitude,
    latitude: address.geocode.latitude,
    name: address.name,
  };
  return (
    <div>
      <Container className="mb-5">
        <Row>
          <Col lg={6}>
            <div>
              <CarouselImage images={images} />
              <About about={description} />
              <hr className="my-4" />
              <RoomOverview overview={detail} price={price} />
              <hr className="my-4" />
              <Features features={features} />
            </div>
          </Col>
          <Col lg={6}>
            <Info title={title} postType={type} detail={detail} price={price} />
            <Contact user={(userData && userData.user) ?? {}} />
          </Col>
        </Row>
      </Container>
      <MapPreview address={addressValue} />
    </div>
  );
}

export default PostComponent;
