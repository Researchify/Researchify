/**
 * This file exports a page for client to edit content in their homepage.
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Container } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/ClientHomeEditor.css';
import {
  getHomepageDataByTeamId,
  updateHomepage,
} from '../../actions/homepage';

import { PrimaryButton } from '../shared/styledComponents';

const ClientHomeEditor = () => {
  // get state from redux
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const aboutUs = useSelector((state) => state.homepage.aboutUs);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlContent, setHtmlContent] = useState();

  // values
  const [homepageValues, setValues] = useState({
    aboutUs,
    teamId,
  });

  const convertContentToHTML = () => {
    const result = convertToHTML(editorState.getCurrentContent());
    setHtmlContent(result);
  };

  const onEditorStateChange = (e) => {
    setEditorState(e);
    convertContentToHTML();
  };

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
    dispatch(updateHomepage(teamId, { teamId, aboutUs: htmlContent }));
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
          {/* <Form.Control
            name="aboutUs"
            as="textarea"
            rows={33}
            // join the string list to display paragraphs
            defaultValue={homepageValues.aboutUs.join('\n\n')}
          /> */}
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </Form.Group>
        <PrimaryButton type="submit" style={{ marginBottom: '15px' }}>
          Save
        </PrimaryButton>
      </Form>
    </Container>
  );
};

export default ClientHomeEditor;
