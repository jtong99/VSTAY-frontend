import React from 'react';
import { Button, Image, Container, Row, Col } from 'react-bootstrap';
import style from './Need.module.scss';
import Info from './Info';
import Detail from './Detail';
import About from './About';
import Preference from './Preference';
import MapPreview from './MapPreview';
import Contact from './Contact';

function NeedPostComponent() {
  //   const images = [
  //     'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  //     'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  //     'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  //     'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
  //   ];
  return (
    <div>
      <div className={style.imageWrapper}>
        <Image
          src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          className={style.avatar}
        />
      </div>
      <Container className="mb-5 pt-4">
        <Row>
          <Col lg={8}>
            <Info />
            <hr className="my-4" />
            <Detail />
            <hr className="my-4" />
            <About />
            <hr className="my-4" />
            <Preference />
          </Col>
          <Col lg={4}>
            <Contact />
          </Col>
        </Row>
      </Container>
      <MapPreview />
    </div>
  );
}

export default NeedPostComponent;
