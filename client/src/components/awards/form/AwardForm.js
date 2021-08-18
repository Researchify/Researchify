/**
 * The Award form component displays an award form, which is used for creating and updating awards
 */

 import { Formik } from 'formik';
 import * as yup from 'yup';
 import { useSelector, useDispatch } from 'react-redux';
 import { Row, Button, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
 
 const AwardForm = ({ closeModal, award, type }) => {
   const dispatch = useDispatch();
   const awardId = useSelector((state) => state.team.awardId);
   const validationSchema = yup.object({
     title: yup
       .string()
       .required('Award Name is required')
       .min(3, 'Award Name is at least 3 characters'),
     Year: yup
        .string()
        .required('Year is required'),
     Month: yup
        .string(),
     Day: yup
        .string(),
     Description: yup
       .string()
       .required('Description is required')
       .min(3, 'Discription is at least 3 characters')
       .max(200, 'Max 200 characters'),
   });
 
   const initValues = {
     title: '',
     Year: '',
     Month: '',
     Day: '',
     Description: '',
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
       //onSubmit={submitForm}
       initialValues={type === 'update' ? award : initValues}
     >
       {({ handleSubmit, handleChange, values, touched, errors }) => (
         <Form noValidate onSubmit={handleSubmit}>
           <Form.Group>
             <Form.Label>Award Title</Form.Label>
             <Form.Control
               type="text"
               name="title"
               placeholder="Award Title"
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
               name="year"
               placeholder="Year"
               value={values.Year}
               onChange={handleChange}
               isInvalid={touched.Year && errors.Year}
             />
             <Form.Control.Feedback type="invalid">
               {errors.Year}
             </Form.Control.Feedback>
           </Form.Group>

           <Form.Group>
             <Form.Label>Month</Form.Label>
             <Form.Control
               type="text"
               name="month"
               placeholder="Month"
               value={values.Month}
               onChange={handleChange}
               isInvalid={touched.Month && errors.Month}
             />
             <Form.Control.Feedback type="invalid">
               {errors.Month}
             </Form.Control.Feedback>
           </Form.Group>

           <Form.Group>
             <Form.Label>Day</Form.Label>
             <Form.Control
               type="text"
               name="day"
               placeholder="Day"
               value={values.Day}
               onChange={handleChange}
               isInvalid={touched.Day && errors.Day}
             />
             <Form.Control.Feedback type="invalid">
               {errors.Day}
             </Form.Control.Feedback>
           </Form.Group>
 
           <Form.Group>
             <Form.Label>Description</Form.Label>
             <Form.Control
               as="textarea"
               row={5}
               name="Description"
               placeholder="description"
               value={values.Description}
               onChange={handleChange}
               isInvalid={touched.Description && errors.Description}
             />
             <Form.Control.Feedback type="invalid">
               {errors.Description}
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
 
 export default AwardForm;
 