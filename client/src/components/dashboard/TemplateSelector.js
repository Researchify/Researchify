/**
 * This file exports a pop up window, that prompts user
 * to select a theme in Researchify dashboard page.
 */
import React, { useState } from 'react';
import {
  Container, Button, Form, Col, Image,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { updateTheme } from '../../actions/website';

// Picture of each layout
import singleColumnLayout from '../../images/theme1.png';
import fShapeLayout from '../../images/f-shape-layout.png';
import zigZagLayout from '../../images/zig-zag-layout.png';

/**
 * Form for user input github credentials and select template.
 */
const TemplateSelector = (props) => {
  const dispatch = useDispatch();

  // Storing and passing Form Inputs, theme1 & layout1 as default
  const [theme, setTheme] = useState(useSelector((state) => state.website.theme));
  const [layout, setLayout] = useState(useSelector((state) => state.website.layout));

  const updateSelections = (form) => {
    const { name, value, id } = form.target;
    if (name === 'theme') {
      setTheme(id);
    } else if (name === 'layout') {
      setLayout(value);
    }
  };

  const storeInputs = (teamId) => {
    const changes = {
      layout,
      theme,
    };
    dispatch(updateTheme(teamId, changes));
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
    <Form
      className="researchify-github-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="theme">
        <Form.Label>Select a Theme Colour</Form.Label>
        <Container fluid>
          <Form.Row>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="theme1">
              <Form.Check
                inline
                id="1"
                type="radio"
                name="theme"
                onChange={updateSelections}
                checked={theme === '1'}
                className="theme-1-radio"
              />
              <div
                className="theme-icon theme-1-icon"
              />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="theme2">
              <Form.Check
                inline
                id="2"
                type="radio"
                name="theme"
                onChange={updateSelections}
                checked={theme === '2'}
                className="theme-2-radio"
              />
              <div
                className="theme-icon theme-2-icon"
              />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="theme3">
              <Form.Check
                inline
                id="3"
                type="radio"
                name="theme"
                onChange={updateSelections}
                checked={theme === '3'}
                className="theme-3-radio"
              />
              <div
                className="theme-icon theme-3-icon"
              />
            </label>
          </Form.Row>
        </Container>

        <Form.Control.Feedback type="invalid">
          Please select a theme.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="layout">
        <Form.Label>Select a Layout</Form.Label>
        <Container fluid>
          <Form.Row>
            <Col className="layout-display">
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
                <Image
                  src={singleColumnLayout}
                  className="img-fluid"
                />
              </label>
            </Col>
            <Col className="layout-display">
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
                <Image
                  src={fShapeLayout}
                  className="img-fluid"
                />
              </label>
            </Col>
            <Col className="layout-display">
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
                <Image
                  src={zigZagLayout}
                  className="img-fluid"
                />
              </label>
            </Col>
          </Form.Row>
        </Container>
      </Form.Group>

      <Button id="submitButton" type="submit">
        Update
      </Button>
    </Form>
  );
};

// props validation
TemplateSelector.propTypes = {
  teamId: PropTypes.string.isRequired,
};

export default TemplateSelector;
