/**
 * The TwitterLink component displays a "dynamic" button that a user will click to link/unlink their twitter feed.
 */
 import { Formik } from 'formik';
 import * as yup from 'yup';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { linkTwitter } from '../../actions/team';
import { Form, Button, Spinner, Jumbotron } from 'react-bootstrap';
import './TwitterLink.css';

const TwitterLink = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const twitterFetchLoading = useSelector(
    (state) => state.team.twitterFetchLoading
  );

  const validationSchema = yup.object({
    profileLink: yup
      .string()
      .required(' Please provide a Twitter handle.'),
  });
  const initValues = {
    profileLink: '',
  };

  
  
  const submitForm = (values) => {
    dispatch(linkTwitter(teamId, values.profileLink));
  };
  
  
  return (
    twitterFetchLoading ? (
      <div className="mb-3 mt-3 text-center">
        <Spinner animation="border" />
      </div>
    ) :
    <Jumbotron className="twitter-link">
      <h6 className="twitter-link_link_message">Link your Twitter account?</h6>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={submitForm}
        initialValues={initValues}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="profileLink"
                placeholder="Profile Link"
                value={values.profileLink}
                onChange={handleChange}
                isInvalid={touched.profileLink && errors.profileLink}
              />
              <Form.Control.Feedback type="invalid">
                {errors.profileLink}
              </Form.Control.Feedback>

              <Button
                type="submit"
                size="sm"
                className="twitter-link_button"
              >
              Link Twitter
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Jumbotron>
  );
};

export default TwitterLink;
