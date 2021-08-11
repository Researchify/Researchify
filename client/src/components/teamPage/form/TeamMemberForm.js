/**
 * The TeamMemberForm component displays a team member form, which is used fro creating and updating team member
 */

import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Button, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { createTeamMember, updateTeamMember } from '../../../actions/team';

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
  });

  const initValues = {
    fullName: '',
    position: '',
    summary: '',
  };

  const submitForm = (values) => {
    console.log(values);
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
      {({ handleSubmit, handleChange, values, touched, errors }) => (
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
              <Button variant="primary" type="submit">
                {' '}
                Confirm{' '}
              </Button>
            </div>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default TeamMemberForm;
