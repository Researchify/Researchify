/**
 * The CategoryPage component displays a form of a publication's category related attributed: Category type, Category title, Volume, Issue, Page and Publisher
 */

import { Formik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import {
  Row,
  Tooltip,
  OverlayTrigger,
  Form,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { categoryTypes } from '../../../config/publications';
import '../publications.css';
import { PrimaryButton, DangerButton } from '../../shared/styledComponents';

const CategoryPage = ({
  next, prev, data, closeModal,
}) => {
  const stepTwoValidationSchema = yup.object({
    category: yup.object({
      type: yup.string(),
      categoryTitle: yup
        .string()
        .required('Category title is required')
        .min(3, 'Category title must be at least 3 characters'),
      volume: yup.string(),
      issue: yup.string(),
      pages: yup.string(),
      publisher: yup.string(),
    }),
  });

  const handleSubmit = (values) => {
    next(values, true);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You will lose your progress
    </Tooltip>
  );

  const placeholderText = {
    JOURNAL: 'Nature',
    CONFERENCE: '26th International Conference on Intelligent User Interfaces',
    BOOK: 'QED: Beauty in mathematical proof',
    Volume: '420',
    Issue: '6915',
    Pages: '476-476',
    Publisher: 'Nature Publishing Group',
  };

  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={stepTwoValidationSchema}
        onSubmit={handleSubmit}
        initialValues={data}
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
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <div className="text-center">
                <ButtonGroup toggle>
                  {Object.keys(categoryTypes).map((category) => (
                    <ToggleButton
                      key={category}
                      type="radio"
                      variant="outline-secondary"
                      value={category}
                      checked={values.category.type.toUpperCase() === category.toUpperCase()}
                      onChange={(e) => setValues({
                        ...values,
                        category: {
                          ...values.category,
                          type: e.currentTarget.value,
                        },
                      })}
                    >
                      {category}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                {' '}
                {Object.keys(categoryTypes)
                  .filter(
                    (category) => category.toUpperCase() === values.category.type.toUpperCase(),
                  )
                  .map((category) => `${
                    category.charAt(0) + category.slice(1).toLowerCase()
                  } title`)}
                {' '}
                *
                {' '}
              </Form.Label>
              <Form.Control
                className="placeholder-text"
                type="text"
                name="category.categoryTitle"
                placeholder={placeholderText[values.category.type.toUpperCase()]}
                value={values.category.categoryTitle}
                onChange={handleChange}
                isInvalid={
                  touched.category
                  && touched.category.categoryTitle
                  && errors.category
                  && errors.category.categoryTitle
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.category && errors.category.categoryTitle}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label> Volume </Form.Label>
              <Form.Control
                className="placeholder-text"
                type="text"
                name="category.volume"
                placeholder={placeholderText.Volume}
                value={values.category.volume}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Issue </Form.Label>
              <Form.Control
                className="placeholder-text"
                type="text"
                name="category.issue"
                placeholder={placeholderText.Issue}
                value={values.category.issue}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Pages </Form.Label>
              <Form.Control
                className="placeholder-text"
                type="text"
                name="category.pages"
                placeholder={placeholderText.Pages}
                value={values.category.pages}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Publisher </Form.Label>
              <Form.Control
                className="placeholder-text"
                type="text"
                name="category.publisher"
                placeholder={placeholderText.Publisher}
                value={values.category.publisher}
                onChange={handleChange}
              />
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
                    onClick={closeModal}
                  >
                    Cancel
                  </DangerButton>
                </OverlayTrigger>
              </div>

              <div className="ml-auto mr-3">
                <PrimaryButton
                  className="mr-2"
                  onClick={() => prev(values)}
                >
                  {' '}
                  Back
                  {' '}
                </PrimaryButton>
                <PrimaryButton type="submit"> Confirm </PrimaryButton>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

// props validation
CategoryPage.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CategoryPage;
