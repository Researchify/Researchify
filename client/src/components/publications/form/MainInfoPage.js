/**
 * The MainInfoPage component displays a form of a publication's main attributes: Title, Published Year, Authours, Description and Link
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


const MainInfoPage = ({ next, data, type, pub, closeModal }) => {
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
        'Link URL provided is not a valid URL, including the protocol (http/https)'
      ),
  });

  const handleSubmit = (values) => {
    next(values);
  };

  const year = new Date().getFullYear();
  const years = Array.from(
    new Array(year - 1899),
    (val, index) => year - index
  );

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You will lose your progress
    </Tooltip>
  );

  const renderAuthors = (values, touched, errors, handleChange, setValues) => {
    return values.authors.map((author, index) => (
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
              let newAuthors = values.authors;
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
  };

  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={stepOneValidationSchema}
        onSubmit={handleSubmit}
        initialValues={type === 'update' ? pub : data}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setValues,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Publication Title</Form.Label>
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

            <Form.Group>
              <Form.Label>Published Year</Form.Label>
              <Form.Control
                className="placeholder-text"
                as="select"
                type="text"
                name="yearPublished"
                value={values.yearPublished}
                onChange={handleChange}
              >
                {years.map((year, index) => {
                  return (
                    <option key={`year${index}`} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label> Authors </Form.Label>
              {renderAuthors(values, touched, errors, handleChange, setValues)}
              <Button
                variant="secondary"
                onClick={() => {
                  setValues({ ...values, authors: [...values.authors, ''] });
                }}
              >
                Add Author
              </Button>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
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

            <Form.Group>
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
                  <Button
                    className="mr-2"
                    variant="outline-danger"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                </OverlayTrigger>
              </div>
              <div className="ml-auto mr-3">
                <Button variant="outline-primary" type="submit">
                  {' '}
                  Next{' '}
                </Button>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MainInfoPage;
