/**
 * This file exports a pop up window, that prompts user
 * to select a theme in Researchify dashboard page.
 */
import React, { useState, useEffect } from 'react';
import {
  Container, Form, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { updateTheme } from '../../actions/website';
import { darkThemePlaceholder, lightThemePlaceholder } from '../../config/clientWebsite';
import { PrimaryButton } from '../shared/styledComponents';
import LayoutThumbnail from './LayoutThumbnail';

/**
 * Form for user input github credentials and select template.
 */
const TemplateSelector = (props) => {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.website.template);

  const [darkMode, setDarkMode] = useState(template.theme === darkThemePlaceholder);
  const [layout, setLayout] = useState(template.layout);

  useEffect(() => {
    setDarkMode(template.theme === darkThemePlaceholder);
    setLayout(template.layout);
  }, [template]);

  const updateSelections = (form) => {
    const { name, value } = form.target;
    if (name === 'layout') {
      setLayout(value);
    }
  };

  const storeInputs = (teamId) => {
    const data = {
      layout,
      theme: darkMode ? darkThemePlaceholder : lightThemePlaceholder,
    };
    dispatch(updateTheme(teamId, data));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      storeInputs(props.teamId);
    }
  };

  return (
    <>
      <div style={{ padding: 50 }}>
        <b>Choose a Theme</b>
        <Form.Check
          type="switch"
          id="custom-switch"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          label="Use Dark mode"
          className="ml-3 mt-2"
        />

        <Form
          className="researchify-github-form mt-4"
          noValidate
          onSubmit={handleSubmit}
        >

          <Form.Group controlId="layout">
            <Form.Label><b>Select a Layout</b></Form.Label>
            <Container fluid>
              <Form.Row>
                <Col className="layout-display" xs={12} xl={4} sm={6}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="layout1">
                    <Form.Check
                      checked={layout === '1'}
                      inline
                      id="layout1"
                      type="radio"
                      label="Layout 1"
                      name="layout"
                      value={1}
                      className="form-radio-text"
                      onChange={updateSelections}
                    />
                    <LayoutThumbnail layoutOption={1} />
                  </label>
                </Col>
                <Col className="layout-display" xs={12} xl={4} sm={6}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="layout2">
                    <Form.Check
                      checked={layout === '2'}
                      inline
                      id="layout2"
                      type="radio"
                      label="Layout 2"
                      name="layout"
                      value={2}
                      className="form-radio-text"
                      onChange={updateSelections}
                    />
                    <LayoutThumbnail layoutOption={2} />
                  </label>
                </Col>
                <Col className="layout-display" xs={12} xl={4} sm={12}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="layout3">
                    <Form.Check
                      checked={layout === '3'}
                      inline
                      id="layout3"
                      type="radio"
                      label="Layout 3"
                      name="layout"
                      value={3}
                      className="form-radio-text"
                      onChange={updateSelections}
                    />
                    <LayoutThumbnail layoutOption={3} />
                  </label>
                </Col>
              </Form.Row>
            </Container>
          </Form.Group>

          <PrimaryButton id="submitButton" type="submit">
            Update
          </PrimaryButton>
        </Form>
      </div>
    </>
  );
};

// props validation
TemplateSelector.propTypes = {
  teamId: PropTypes.string.isRequired,
};

export default TemplateSelector;
