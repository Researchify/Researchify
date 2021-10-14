/**
 * This file exports a page for client to edit content in their homepage.
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Container } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/ClientHomeEditor.css';
import {
  getHomepageDataByTeamId,
  updateHomepage,
} from '../../actions/homepage';
import DeployPage from '../dashboard/deploy/DeployPage';

import { PrimaryButton } from '../shared/styledComponents';

const ClientHomeEditor = () => {
  // get state from redux
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const aboutUs = useSelector((state) => state.homepage.aboutUs);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlContent, setHtmlContent] = useState();

  const styles = {
    wrapperStyle: {
      borderStyle: 'solid',
      borderColor: '#ced4da',
      borderRadius: '.25rem',
      borderWidth: '1px',
    },
    toolbarStyle: {
      borderBottomColor: '#ced4da',
    },
    editorStyle: {
      height: 'calc(69vh)',
      maxHeight: '750px',
    },
    toolbar: {
      options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'emoji'],
      inline: {
        inDropdown: false,
        options: ['bold', 'italic', 'underline'],
      },
      blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
      },
      list: { inDropdown: false },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
    },
  };

  const onEditorStateChange = (e) => {
    setEditorState(e);
    // convert editor content to HTML and save to state
    setHtmlContent(convertToHTML(editorState.getCurrentContent()));
  };

  useEffect(() => {
    if (teamId) {
      dispatch(getHomepageDataByTeamId(teamId));
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    setEditorState(EditorState.createWithContent(convertFromHTML(aboutUs)));
  }, [aboutUs]);

  // Save values in editor and send to back end
  const saveEditor = (event) => {
    // prevent refreshing page after save
    event.preventDefault();
    dispatch(updateHomepage(teamId, htmlContent));
  };

  return (
    <Container className="client-homepage-container">
      <Form onSubmit={saveEditor}>
        <Form.Group>
          <Form.Label>
            <div className="section-title">About Us</div>
            <div className="section-description">
              Tell people about your team!
            </div>
          </Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperStyle={styles.wrapperStyle}
            toolbarStyle={styles.toolbarStyle}
            editorStyle={styles.editorStyle}
            toolbar={styles.toolbar}
          />
        </Form.Group>
        <PrimaryButton type="submit" style={{ marginBottom: '15px' }}>
          Save
        </PrimaryButton>
      </Form>
      <DeployPage
        teamId={teamId}
      />
    </Container>
  );
};

export default ClientHomeEditor;
