import React from 'react';
import Avatar from './Avatar';
import Info from './Info';
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
    </Container>
  );
}

export default ProfileComponent;
