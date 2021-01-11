import React, { useState, useEffect } from 'react';
import { Tab, Nav, Badge, Row, Col, Container } from 'react-bootstrap';
import SharePost from './SharePost';
import useDataCount from '@hooks/api/useDataShareCount';
import style from './Admin.module.scss';

function AdminComponent() {
  const [activeTab, setActiveTab] = useState('pending');
  const { data: totalCount } = useDataCount();
  const [total, setTotal] = useState({
    pending:
      (totalCount && totalCount.result && totalCount.result.totalPending) || 0,
    approved:
      (totalCount && totalCount.result && totalCount.result.totalApproved) || 0,
    rejected:
      (totalCount && totalCount.result && totalCount.result.totalRejected) || 0,
  });

  useEffect(() => {
    if (totalCount) {
      setTotal({
        pending:
          (totalCount && totalCount.result && totalCount.result.totalPending) || 0,
        approved:
          (totalCount && totalCount.result && totalCount.result.totalApproved) || 0,
        rejected:
          (totalCount && totalCount.result && totalCount.result.totalRejected) || 0,
      });
    }
  }, [totalCount]);
  return (
    <div div className={style.wrapper}>
      <h4 className="font-weight-600">Share Post List</h4>

      <Tab.Container activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
        <Container fluid>
          <Row>
            <Col md={12}>
              <Nav variant="tabs" style={{ margin: 10 }}>
                <Nav.Item>
                  <Nav.Link
                    eventKey="pending"
                    className="text-primary"
                    // onClick={handleChangePendingTab}
                  >
                    Pending
                    <Badge pill variant="primary" style={{ marginLeft: 10 }}>
                      {total.pending}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="approved" className="text-success">
                    Approved
                    <Badge
                      pill
                      variant="primary"
                      style={{ marginLeft: 10, backgroundColor: 'rgb(17,200,13)' }}
                    >
                      {total.approved}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="rejected" className="text-danger">
                    Rejected
                    <Badge
                      pill
                      variant="primary"
                      style={{ marginLeft: 10, backgroundColor: 'rgb(225,11,11)' }}
                    >
                      {total.rejected}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            {/* <Col md={5}>
              <h4 className="font-weight-600">Share Post List</h4>
            </Col> */}
          </Row>
        </Container>
        <Tab.Content>
          <Tab.Pane eventKey="pending">
            <SharePost
              type={activeTab}
              onChangeTotal={(v) => setTotal({ ...total, pending: v })}
              //   data={data}
              //   error={error}
              //   typeList={typeList}
              //   onSelectVideo={onSelectVideo}
              //   videoReview={videoReview}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="approved">
            <SharePost
              type={activeTab}
              onChangeTotal={(v) => setTotal({ ...total, approved: v })}
              //   data={data}
              //   error={error}
              //   typeList={typeList}
              //   onSelectVideo={onSelectVideo}
              //   videoReview={videoReview}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="rejected">
            <SharePost
              type={activeTab}
              onChangeTotal={(v) => setTotal({ ...total, rejected: v })}
              //   data={data}
              //   error={error}
              //   typeList={typeList}
              //   onSelectVideo={onSelectVideo}
              //   videoReview={videoReview}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default AdminComponent;
