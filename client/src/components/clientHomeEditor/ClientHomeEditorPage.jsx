import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { FaTwitter } from 'react-icons/fa';
import TwitterFeed from '../twitter/TwitterFeed';
import TwitterLink from '../twitter/TwitterLink';
import ClientHomeEditor from './ClientHomeEditor';
import './css/home-editor-page.mobile.css';

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
  twitterIconFloat: {
    zIndex: '20',
    position: 'fixed',
    bottom: '0',
    right: '0',
    marginRight: '30px',
    marginBottom: '30px',
    height: '50px',
    width: '50px',
    color: '#56658a',
  },
  twitterBoxFloat: {
    zIndex: '20',
    position: 'fixed',
    bottom: '0',
    right: '0',
    marginRight: '30px',
    marginBottom: '30px',
  },
};

const ClientHomeEditorPage = () => {
  // check if twitter linked
  const linkedHandle = useSelector((state) => state.team.twitterHandle);
  const Twitter = () => {
    if (linkedHandle) {
      return <TwitterFeed />;
    }

    return <TwitterLink />;
  };
  // show twitter icon or close icon
  const [twitterIcon, setTwitterIcon] = useState(true);
  // shows twitter box in narrow view
  const twitterIconClicked = () => {
    setTwitterIcon(!twitterIcon);
  };
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
          <Twitter
            style={{
              position: 'fixed',
              marginLeft: '-10px',
            }}
          />
        </Col>
      </Row>

      {twitterIcon
        ? null
        : (
          <Twitter
            className="home-editor-narrow-twitter"
            style={styles.twitterBoxFloat}
          />
        )}
      <FaTwitter
        style={styles.twitterIconFloat}
        className="home-editor-narrow-twitter"
        onClick={twitterIconClicked}
      />
    </>
  );
};

export default ClientHomeEditorPage;
