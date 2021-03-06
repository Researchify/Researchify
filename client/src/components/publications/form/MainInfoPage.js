/**
 * The MainInfoPage component displays a form of a publication's main attributes: Title, Published Year, Authors, Description and Link
 */

import { Formik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import {
  Row,
  InputGroup,
  Button,
  Tooltip,
  OverlayTrigger,
  Form,
} from 'react-bootstrap';
import '../publications.css';
import { PropTypes } from 'prop-types';
import { PrimaryButton, DangerButton } from '../../shared/styledComponents';
import { PublicationsManualFormWalkthrough } from '../publicationsOnboarding';

const MainInfoPage = ({
  next, data, type, pub, closeModal,
}) => {
  const stepOneValidationSchema = yup.object({
    title: yup
      .string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters'),
    yearPublished: yup.string().required(),
    authors: yup
      .array()
      .of(yup.string().required('Authors must not be empty'))
      .required('Author is required'),
    description: yup
      .string()
      .required('Description is required')
      .min(5, 'Description must be at least 5 characters'),
    link: yup
      .string()
      .url(
        'Link URL provided is not a valid URL, including the protocol (http/https)',
      ),
  });

  const handleSubmit = (values) => {
    next(values);
  };

  const year = new Date().getFullYear();
  const years = Array.from(
    new Array(year - 1899),
    (val, index) => year - index,
  );

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You will lose your progress
    </Tooltip>
  );

  const renderAuthors = (values, touched, errors, handleChange, setValues) => values.authors.map((author, index) => (
    //  ↓↓ need to use index as key, will cause the author field lose focus when typing if use author as key
    // eslint-disable-next-line react/no-array-index-key
    <InputGroup key={index}>
      <Form.Control
        className="placeholder-text"
        type="text"
        placeholder="John Smith"
        name={`authors[${index}]`}
        value={values.authors[index]}
        onChange={handleChange}
        isInvalid={touched.authors && errors.authors && errors.authors[index]}
      />
      <InputGroup.Append>
        <Button
          onClick={() => {
            const newAuthors = values.authors;
            newAuthors.splice(index, 1);
            setValues({ ...values, authors: newAuthors });
          }}
          variant="outline-secondary"
          disabled={values.authors.length === 1}
        >
          Remove
        </Button>
      </InputGroup.Append>
      <Form.Control.Feedback type="invalid">
        {errors.authors && errors.authors[index]}
      </Form.Control.Feedback>
    </InputGroup>
  ));

  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={stepOneValidationSchema}
        onSubmit={handleSubmit}
        initialValues={type === 'update' ? pub : data}
      >
        {({
          // ↓↓ formik validation need it
          handleSubmit, // eslint-disable-line no-shadow
          handleChange,
          values,
          touched,
          errors,
          setValues,
        }) => (
          <Form noValidate onSubmit={handleSubmit} id="publication-title-form">
            <PublicationsManualFormWalkthrough />
            <Form.Group id="publication-title">
              <Form.Label>
                Publication Title
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className="placeholder-text"
                as="textarea"
                row={2}
                name="title"
                placeholder="A neural model for method name generation from functional description"
                value={values.title}
                onChange={handleChange}
                isInvalid={touched.title && errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="publication-year">
              <Form.Label>
                Published Year
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className="placeholder-text"
                as="select"
                type="text"
                name="yearPublished"
                value={values.yearPublished}
                onChange={handleChange}
              >
                {years.map((eachYear) => (
                  <option key={eachYear} value={eachYear}>
                    {eachYear}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group id="publication-author">
              <Form.Label>
                {' '}
                Authors
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              {renderAuthors(values, touched, errors, handleChange, setValues)}
              <Button
                id="publication-add-author"
                className="mt-2"
                variant="secondary"
                onClick={() => {
                  setValues({ ...values, authors: [...values.authors, ''] });
                }}
              >
                Add More Author
              </Button>
            </Form.Group>

            <Form.Group id="publication-desc">
              <Form.Label>
                Description
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className="placeholder-text"
                as="textarea"
                row={4}
                name="description"
                placeholder="The names of software artifacts, e.g., method names, are important for software understanding and maintenance..."
                value={values.description}
                onChange={handleChange}
                isInvalid={touched.description && errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="publication-link">
              <Form.Label>Link</Form.Label>
              <Form.Control
                className="placeholder-text"
                type="text"
                name="link"
                placeholder="https://ieeexplore.ieee.org/abstract/document/8667994/"
                value={values.link}
                onChange={handleChange}
                isInvalid={touched.link && errors.link}
              />
              <Form.Control.Feedback type="invalid">
                {errors.link}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <div className="ml-3">
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="bottom"
                  overlay={renderTooltip}
                >
                  <DangerButton
                    className="mr-2"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </DangerButton>
                </OverlayTrigger>
              </div>
              <div className="ml-auto mr-3">
                <PrimaryButton type="submit">
                  {' '}
                  Next
                  {' '}
                </PrimaryButton>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

// props validation
MainInfoPage.propTypes = {
  next: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  pub: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
};
MainInfoPage.defaultProps = {
  pub: undefined,
};

export default MainInfoPage;
