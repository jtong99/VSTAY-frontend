import React from 'react';
import { Button, Image, Container, Row, Col } from 'react-bootstrap';
import CarouselImage from '@components/utils/CarouselImages';
import Info from './Info';
import About from './About';
import RoomOverview from './RoomOverview';
import Features from './Features';

function PostComponent({
  data: { images, description, detail, price, title, type, features },
}) {
  //   const images = [
  //     'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  //     'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  //     'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  //     'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
  //   ];
  return (
    <Container fluid>
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
        </Col>
      </Row>
    </Container>
  );
}

export default PostComponent;
