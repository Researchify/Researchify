/**
 * The Achievement form component displays an achievement form, which is used for creating and updating achievements
 */

 import { Formik } from 'formik';
 import * as yup from 'yup';
 import { useSelector, useDispatch } from 'react-redux';
 import { Row, Button, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
 import { updateAchievement, createAchievement } from '../../../actions/achievements';

 const AchievementForm = ({ closeModal, achievement, type }) => {
   const dispatch = useDispatch();
   const teamId = useSelector((state) => state.team.teamId);
   const validationSchema = yup.object({
     title: yup
       .string()
       .required('Achievement Name is required')
       .min(3, 'Achievement Name is at least 3 characters')
       .max(60, 'Achievement Name is at less than 60 characters'),
       yearAwarded: yup
        .number()
        .min(1000, 'Invalid year')
        .max(9999, 'Invalid year')
        .required('Year is required'),
     description: yup
       .string()
       .required('Description is required')
       .min(3, 'Description is at least 3 characters')
       .max(500, 'Max 500 characters'),
   });
 
   const initValues = {
     title: '',
     yearAwarded: '',
     description: ''
   };

   const submitForm = (values) => {
    const data = {
      title: values.title,
      yearAwarded: values.yearAwarded,
      description: values.description,
      teamId
    };

    if (type === 'update') {
      dispatch(updateAchievement(achievement._id, data));
    } else if (type === 'create') {
      dispatch(createAchievement(data));
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
       initialValues={type === 'update' ? achievement : initValues}
     >
       {({ handleSubmit, handleChange, values, touched, errors }) => (
         <Form noValidate onSubmit={handleSubmit}>
           <Form.Group>
             <Form.Label>Achievement Title</Form.Label>
             <Form.Control
               type="text"
               name="title"
               placeholder="Achievement Title"
               value={values.title}
               onChange={handleChange}
               isInvalid={touched.title && errors.title}
             />
             <Form.Control.Feedback type="invalid">
               {errors.title}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group>
             <Form.Label>Year</Form.Label>
             <Form.Control
               type="text"
               name="yearAwarded"
               placeholder="YYYY"
               value={values.yearAwarded}
               onChange={handleChange}
               isInvalid={touched.yearAwarded && errors.yearAwarded}
             />
             <Form.Control.Feedback type="invalid">
               {errors.yearAwarded}
             </Form.Control.Feedback>
           </Form.Group>
           <Form.Group>
             <Form.Label>Description</Form.Label>
             <Form.Control
               as="textarea"
               row={5}
               name="description"
               placeholder="Description"
               value={values.description}
               onChange={handleChange}
               isInvalid={touched.description && errors.description}
             />
             <Form.Control.Feedback type="invalid">
               {errors.description}
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
 
 export default AchievementForm;
 