/**
 * This file exports a Update passowrd Form component.
 */

import { Formik } from 'formik';
import { Form, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { updatePassword } from '../../actions/team';
import { PrimaryButton, DangerButton } from '../shared/styledComponents';

const UpdatePasswordForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { teamId } = useSelector((state) => state.team);
  const passwordSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .required('Please Enter your current password'),
    newPassword: yup
      .string()
      .required('Please Enter your new password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!-/:-@[-`{-~]{8,20}$/,
        'Password must be 8 or more characters with a mix of letters and numbers',
      ),
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const initValues = {
    currentPassword: '',
    newPassword: '',
    confirmedPassword: '',
  };

  const submitForm = (values, { setFieldError }) => {
    const passwordInfo = { ...values };
    delete passwordInfo.confirmedPassword;
    dispatch(updatePassword(teamId, passwordInfo, setFieldError, closeModal));
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={passwordSchema}
      onSubmit={submitForm}
      initialValues={initValues}
    >
      {({
        handleSubmit, handleChange, values, touched, errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={values.currentPassword}
              onChange={handleChange}
              isInvalid={touched.currentPassword && errors.currentPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={values.newPassword}
              onChange={handleChange}
              isInvalid={touched.newPassword && errors.newPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmedPassword"
              placeholder="Confirmed Password"
              value={values.confirmedPassword}
              onChange={handleChange}
              isInvalid={touched.confirmedPassword && errors.confirmedPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmedPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <div className="ml-auto mr-3">
              <DangerButton
                className="mr-2"
                onClick={closeModal}
              >
                Cancel
              </DangerButton>
              <PrimaryButton variant="primary" type="submit">
                {' '}
                Update Password
                {' '}
              </PrimaryButton>
            </div>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

// props validation
UpdatePasswordForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default UpdatePasswordForm;
