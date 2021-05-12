import React from 'react';
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import PublicationForm from './PublicationForm';


const CategoryForm = ({type}) => {

    const initialValues = {
        type: type,
        title: "",
        volume: "",
        issue: "",
        pages: "",
        publisher: ""
    }

    const schema = yup.object({
        title: yup.string().required(`${type} is required`).min(3, `${type} must be at least 3 characters`),
        volume: yup.string(),
        issue: yup.string(), 
        pages: yup.string(),
        publisher: yup.string(),
    })

    const onSubmit = (values) => {
        console.log(values)
    }
    
    return(
        <>
            <Formik
                enableReinitialize 
                validationSchema={schema}
                onSubmit={(values)=> onSubmit(values)}
                initialValues={initialValues}
            >
            {({ handleSubmit, handleChange, values, touched, errors }) => 
            (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label> {type} </Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder={type}
                            value={values.title}
                            onChange={handleChange}
                            isInvalid={touched.title && errors.title}
                        />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Volume </Form.Label>
                        <Form.Control
                            type="text"
                            name="volume"
                            placeholder="Volume"
                            value={values.volume}
                            onChange={handleChange}
                            //isInvalid={touched.volume && errors.volume}
                        />
                        {/* <Form.Control.Feedback type="invalid">{errors.volume}</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Issue </Form.Label>
                        <Form.Control
                            type="text"
                            name="issue"
                            placeholder="Issue"
                            value={values.issue}
                            onChange={handleChange}
                            //isInvalid={touched.issue && errors.issue}
                        />
                        {/* <Form.Control.Feedback type="invalid">{errors.issue}</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Pages </Form.Label>
                        <Form.Control
                            type="text"
                            name="pages"
                            placeholder="Pages"
                            value={values.pages}
                            onChange={handleChange}
                            //isInvalid={touched.pages && errors.pages}
                        />
                        {/* <Form.Control.Feedback type="invalid">{errors.pages}</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Publisher </Form.Label>
                        <Form.Control
                            type="text"
                            name="publisher"
                            placeholder="Publisher"
                            value={values.publisher}
                            onChange={handleChange}
                            //isInvalid={touched.publisher && errors.publisher}
                        />
                        {/* <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback> */}
                    </Form.Group>

                    <Button type="submit">Next</Button>
                </Form>
            )}
            </Formik>
        </>
    )
      

  }

  export default CategoryForm