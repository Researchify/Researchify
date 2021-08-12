/**
 * The TwitterLink component displays a "dynamic" button that a user will click to link/unlink their twitter feed.
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';

import { linkTwitter } from '../../actions/team';

import './TwitterLink.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const TwitterLink = () => {
  const dispatch = useDispatch();
  const [handle, setHandle] = useState('');
  const teamId = useSelector((state) => state.team.teamId);
  const twitterFetchLoading = useSelector(
    (state) => state.team.twitterFetchLoading
  );
  const [validated, setValidated] = useState(false);

  const handleLinkButtonClick = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log('in');
    } else {
      dispatch(linkTwitter(teamId, handle));
    }
    console.log(validated);

    // setValidated(true);
  };

  const handleCancelButtonClick = () => {
    setHandle('');
  };

  // twitterFetchLoading ? (
  //   <div className="mb-3 mt-3 text-center">
  //     <Spinner animation="border" />
  //   </div>
  // ) :
  return (
    <Jumbotron className="twitter-link">
      <h6 className="twitter-link_link_message">Link your Twitter account?</h6>
      <Form noValidate validated={validated}>
        <Form.Row>
          <Col>
            <Form.Control
              required
              minlength="1"
              maxlength="15"
              className="twitter-link_input"
              size="sm"
              placeholder="Enter handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Twitter handle.
            </Form.Control.Feedback>
          </Col>
        </Form.Row>
        <Button
          type="submit"
          size="sm"
          className="twitter-link_button"
          onClick={handleLinkButtonClick}
        >
          Link Twitter
        </Button>
      </Form>
    </Jumbotron>
  );
};

export default TwitterLink;
