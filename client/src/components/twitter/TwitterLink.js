/**
 * The TwitterLink component displays a "dynamic" button that a user will click to link/unlink their twitter feed.
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { linkTwitter } from '../../actions/team';

import './TwitterLink.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const TwitterLink = () => {
  const dispatch = useDispatch();
  const [handle, setHandle] = useState('');
  const [revealInput, setRevealInput] = useState(false);
  const teamId = useSelector((state) => state.team.teamId);

  const handleLinkButtonClick = () => {
    setRevealInput(true);
    dispatch(linkTwitter(teamId, handle));
  };

  const handleCancelButtonClick = () => {
    setHandle('');
    setRevealInput(false);
  };

  return (
    <Jumbotron className="twitter-link">
      <h6 className="twitter-link_link_message">Link your Twitter account?</h6>
      {revealInput && (
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                className="twitter-link_input"
                size="sm"
                placeholder="Enter handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
              <Form.Text muted>Invalid Twitter Handle</Form.Text>
            </Col>
          </Form.Row>
        </Form>
      )}
      <Button
        type="submit"
        size="sm"
        className="twitter-link_button"
        onClick={handleLinkButtonClick}
      >
        Link Twitter
      </Button>
      {revealInput && (
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={handleCancelButtonClick}
        >
          Cancel
        </Button>
      )}
    </Jumbotron>
  );
};

export default TwitterLink;
