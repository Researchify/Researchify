import React from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TwitterFeed from '../twitter/TwitterFeed';
import TwitterLink from '../twitter/TwitterLink';
import ClientHomeEditor from './ClientHomeEditor';
import './css/home-editor-page.mobile.css';

const ClientHomeEditorPage = () => {
  // css
  const styles = {
    leftCol: {
      width: '80%',
      float: 'left',
    },
    rightCol: {
      float: 'right',
      width: '20%',
      height: 'inherit',
      maxWidth: '333px',
      padding: '16px',
    },
  };
  // check if twitter linked
  const linkedHandle = useSelector((state) => state.team.twitterHandle);
  // return entire page
  return (
    <>
      <Row>
        <Col style={styles.leftCol}>
          <ClientHomeEditor />
        </Col>
        <Col
          style={styles.rightCol}
          className="home-editor-right-col"
        >
          {linkedHandle ? <TwitterFeed /> : <TwitterLink />}
        </Col>
      </Row>
    </>
  );
};

export default ClientHomeEditorPage;
