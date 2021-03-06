/**
 * The TwitterLink component displays a "dynamic" button that a user will click to link/unlink their twitter feed.
 */
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Form, Spinner, Jumbotron,
} from 'react-bootstrap';
import { linkTwitter } from '../../actions/team';
import './TwitterLink.css';

import { PrimaryButton } from '../shared/styledComponents';

const TwitterLink = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    twitterHandle: yup
      .string()
      .required('Please provide a Twitter handle.')
      .min(1, 'Must be at least 1 character')
      .max(15, 'Must be no longer than 15 characters')
      .trim(),
  });

  const initValues = {
    twitterHandle: '',
  };

  const submitForm = (values) => {
    if (values.twitterHandle !== '') {
      setIsLoading(true);
    }
    dispatch(linkTwitter(teamId, values.twitterHandle));
    setIsLoading(false);
  };

  return (
    <Jumbotron className="twitter-link">
      <h6 className="twitter-link_link_message">Link your Twitter account?</h6>
      {isLoading ? (
        <div className="mb-3 mt-3 text-center">
          <Spinner animation="border" />
        </div>
      ) : (
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
              <Form.Group>
                <Form.Control
                  type="text"
                  name="twitterHandle"
                  placeholder="Twitter Username"
                  value={values.twitterHandle}
                  onChange={handleChange}
                  isInvalid={touched.twitterHandle && errors.twitterHandle}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.twitterHandle}
                </Form.Control.Feedback>

                <PrimaryButton
                  fontSize="0.875rem"
                  type="submit"
                  className="twitter-link_button"
                >
                  Link Twitter
                </PrimaryButton>
              </Form.Group>
            </Form>
          )}
        </Formik>
      )}
    </Jumbotron>
  );
};

export default TwitterLink;
