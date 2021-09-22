import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, InputGroup, Form,
} from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import { importPublications } from '../../../actions/publications';
import { IMPORT_FAIL, UPDATE_GSCHOLAR_ID } from '../../../actions/types';
import '../publications.css';
import { PrimaryButton, DangerButton } from '../../shared/styledComponents';

const ProfileLinkPage = ({ closeModal }) => {
  const teamId = useSelector((state) => state.team.teamId);
  const dispatch = useDispatch();
  let gScholarId;

  const validationSchema = yup.object({
    profileLink: yup
      .string()
      .required('Please provide Google Scholar Profile Link'),
  });
  const initValues = {
    profileLink: '',
  };

  const validation = (values) => {
    // extracting the authorId from the profileLink
    const position = values.profileLink.indexOf('user=');
    if (position === -1) {
      dispatch({
        type: IMPORT_FAIL,
        payload: 'Please provide a valid profile link',
      });
      return false;
    }
    gScholarId = values.profileLink.substring(position + 5, position + 17);
    dispatch({
      type: UPDATE_GSCHOLAR_ID,
      payload: gScholarId,
    });
    return true;
  };

  const submitForm = (values) => {
    if (validation(values)) {
      dispatch(importPublications(gScholarId, 0, teamId));
    }
  };

  return (
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
            <Form.Label>
              Enter your Google Scholar profile link below:
            </Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <BsFillPersonFill />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="placeholder-text"
                type="text"
                name="profileLink"
                placeholder="https://scholar.google.com.sg/citations?user=3tyGlPsAAAAJ"
                value={values.profileLink}
                onChange={handleChange}
                isInvalid={touched.profileLink && errors.profileLink}
              />
              <Form.Control.Feedback type="invalid">
                {errors.profileLink}
              </Form.Control.Feedback>
            </InputGroup>
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
                Confirm
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
ProfileLinkPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ProfileLinkPage;
