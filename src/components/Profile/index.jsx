import React from 'react';
import Avatar from './Avatar';
import Info from './Info';
import UserPost from './UserPost';
import UserNeedPost from './UserNeedPost';

import { Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

function ProfileComponent({ data }) {
  return (
    <Container style={{ minHeight: '70vh' }}>
      <Row>
        <Col lg={4}>
          <Avatar avatar={data.avatar} />
        </Col>
        <Col lg={8}>
          <Info data={data} />
        </Col>
      </Row>
      <UserPost userId={data._id} />
      <UserNeedPost userId={data._id} />
    </Container>
  );
}

export default ProfileComponent;
