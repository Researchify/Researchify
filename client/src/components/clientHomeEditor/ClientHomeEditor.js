/**
 * This file exports a page for client to edit content in their homepage.
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Container, Button } from 'react-bootstrap';
import './ClientHomeEditor.css';
import {
  getHomepageDataByTeamId,
  updateHomepage,
} from '../../actions/homepage';

const ClientHomeEditor = () => {
  // get state from redux
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const aboutUs = useSelector((state) => state.homepage.aboutUs);

  // values
  const [homepageValues, setValues] = useState({
    aboutUs,
    teamId,
  });

  useEffect(() => {
    if (teamId) {
      dispatch(getHomepageDataByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  // setValues when teamId and aboutUs change
  useEffect(() => {
    setValues({
      aboutUs,
      teamId,
    });
  }, [teamId, aboutUs]);

  // Handles whenever the form value is changing
  const handleFormChanges = (form) => {
    const { name, value } = form.target;
    // store paragraphs into an array and remove empty paragraph
    let splittedValue = value.split('\n');
    splittedValue = splittedValue.filter((e) => e !== '');
    setValues({ ...homepageValues, [name]: splittedValue });
  };

  // Save values in editor and send to back end
  const saveEditor = (event) => {
    // prevent refreshing page after save
    event.preventDefault();
    dispatch(updateHomepage(teamId, homepageValues));
  };

  return (
    <Container className="client-homepage-container">
      <Form onSubmit={saveEditor}>
        <Form.Group onChange={handleFormChanges}>
          <Form.Label>
            <div className="section-title">About Us</div>
            <div className="section-description">
              Tell people about your team!
            </div>
          </Form.Label>
          <Form.Control
            name="aboutUs"
            as="textarea"
            rows={6}
            // join the string list to display paragraphs
            defaultValue={homepageValues.aboutUs.join('\n\n')}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default ClientHomeEditor;
