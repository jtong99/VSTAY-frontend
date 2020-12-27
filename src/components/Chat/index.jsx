import React, { useState, useEffect } from 'react';
import useMessageOfCurrentUser from '@hooks/api/useMessageOfCurrentUser';
import { Container, Row, Col } from 'react-bootstrap';
import ChatElement from './ChatElement';
import ChatContent from './ChatContent';
import styles from './ChatElement.module.scss';
import { useTranslation } from 'i18n';
import firebase from '@helper/firebase';
import 'firebase/firestore';

function ChatComponent() {
  const data = useMessageOfCurrentUser();
  const { t } = useTranslation(['footer', 'common']);
  const [currentChatContent, setCurrentChatContent] = useState('');
  const firestore = firebase.firestore();
  useEffect(() => {
    if (!currentChatContent && data && data.length > 0) {
      setCurrentChatContent(data[0]);
    }
  }, []);
  if (!data) {
    return <div> </div>;
  }
  return (
    <Container className={styles.wrapper}>
      {/* <button onClick={() => console.log(data)}>clic</button> */}
      <Row>
        <Col lg={5} className={styles.colContainer}>
          <h4 className="font-weight-600">{t('Chat')}</h4>
          <div>
            {data.map((d, i) => (
              <ChatElement key={`item-${i}`} data={d} />
            ))}
          </div>
        </Col>
        <Col lg={7}>
          <ChatContent />
        </Col>
      </Row>
    </Container>
  );
}

export default ChatComponent;
