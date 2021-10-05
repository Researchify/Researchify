/**
 * The TeamMemberForm component displays a team member form, which is used fro creating and updating team member
 */

import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Tooltip, OverlayTrigger, Form,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { createTeamMember, updateTeamMember } from '../../../actions/team';

import { PrimaryButton, DangerButton } from '../../shared/styledComponents';

const TeamMemberForm = ({ closeModal, member, type }) => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required('Name is required')
      .min(3, 'Name is at least 3 characters'),
    position: yup.string().required('Posiiton is required'),
    summary: yup
      .string()
      .required('Summary is required')
      .min(3, 'Summary is at least 3 characters')
      .max(200, 'Max 200 characters'),
    memberPic: yup
      .mixed(),
  });

  const initValues = {
    fullName: '',
    position: '',
    summary: '',
  };

  const submitForm = (values) => {
    if (type === 'update') {
      dispatch(updateTeamMember(teamId, values));
    } else if (type === 'create') {
      dispatch(createTeamMember(teamId, values));
    }
    closeModal();
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You will lose your progress
    </Tooltip>
  );

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={submitForm}
      initialValues={type === 'update' ? member : initValues}
    >
      {({
        handleSubmit, handleChange, values, touched, errors, setFieldValue,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="text"
              name="fullName"
              placeholder="John Smith"
              value={values.fullName}
              onChange={handleChange}
              isInvalid={touched.fullName && errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control
              className="placeholder-text"
              type="text"
              name="position"
              placeholder="Associated Professor"
              value={values.position}
              onChange={handleChange}
              isInvalid={touched.position && errors.position}
            />
            <Form.Control.Feedback type="invalid">
              {errors.position}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Summary</Form.Label>
            <Form.Control
              className="placeholder-text"
              as="textarea"
              row={5}
              name="summary"
              placeholder="Summary"
              value={values.summary}
              onChange={handleChange}
              isInvalid={touched.summary && errors.summary}
            />
            <Form.Control.Feedback type="invalid">
              {errors.summary}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Member Photo
            </Form.Label>
            <Form.Control
              type="file"
              name="memberPic"
              accept="image/*"
              multiple={false}
              onChange={(event) => {
                const reader = new FileReader();
                const file = event.target.files[0];
                if (file) {
                  reader.onload = (e) => {
                    setFieldValue('memberPic', e.target.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
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
              <PrimaryButton type="submit">
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
TeamMemberForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  member: PropTypes.object,
  type: PropTypes.string.isRequired,
};
TeamMemberForm.defaultProps = {
  member: undefined,
};

export default TeamMemberForm;
