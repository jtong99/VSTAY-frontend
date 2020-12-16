import React from 'react';
import Avatar from './Avatar';
import Info from './Info';
import UserPost from './UserPost';
import UserNeedPost from './UserNeedPost';

import { Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

function ProfileComponent({ data }) {
  return (
    <div style={{ minHeight: '70vh' }}>
      <Container>
        <Row>
          <Col lg={4}>
            <Avatar avatar={data.avatar} />
          </Col>
          <Col lg={8}>
            <Info data={data} />
          </Col>
        </Row>
      </Container>
      <div style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
        <UserPost userId={data._id} />
        <UserNeedPost userId={data._id} />
      </div>
    </div>
  );
}

export default ProfileComponent;
