import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, InputGroup, Button, Form, Col,
} from 'react-bootstrap';

import { updateWebsiteTitle } from '../../../../actions/website';
import { deployToGHPages } from '../../../../actions/team';

const DeployForm = ({ teamId }) => {
  const { title } = useSelector((state) => state.website);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    websiteTitle: yup
      .string()
      .required('Please provide title for your website')
      .min(3, 'Website title must be at least 3 characters')
      .max(30, 'Website title must be less than 30 characters'),
  });
  const initValues = {
    websiteTitle: title,
  };
  const handleDeploy = () => {
    const accessToken = localStorage.getItem('GH_access_token'); // eslint-disable-line no-undef
    // call backend endpoint to deploy and give the access token
    dispatch(deployToGHPages(teamId, accessToken));
  };
  const submitForm = (values) => {
    dispatch(updateWebsiteTitle(teamId, values));
  };
  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={submitForm}
        initialValues={initValues}
      >
        {({
          handleSubmit, handleChange, values, touched, errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mt-3">
              <Form.Label column>
                Website Title
              </Form.Label>
              <Col sm="6">
                <InputGroup className="mb-3">
                  <Form.Control
                    className="placeholder-text"
                    type="text"
                    name="websiteTitle"
                    value={values.websiteTitle}
                    onChange={handleChange}
                    isInvalid={touched.websiteTitle && errors.websiteTitle}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.websiteTitle}
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col sm="3">
                <Button
                  type="submit"
                  disabled={title === values.websiteTitle}
                >
                  Save Title
                </Button>
              </Col>
            </Form.Group>
            <Button
              className="float-right"
              disabled={title !== values.websiteTitle}
              onClick={() => handleDeploy(values.websiteTitle)}
            >
              Deploy to GitHub Pages
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DeployForm;
