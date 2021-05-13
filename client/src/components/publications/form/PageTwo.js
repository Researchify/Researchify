/**
 * The PageTwo component displays the second page of the publication form
 */

import { Formik } from "formik";
import * as yup from "yup";
import React from 'react';
import { Row, Button, Tooltip, OverlayTrigger, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import { CATEGORY_TYPE } from './PublicationForm'

const PageTwo = ({next, prev, data, closeModal}) => {
    const stepTwoValidationSchema = yup.object({
        category: yup.object({
            type: yup.string(),
            categoryTitle: yup.string()
                .required(`${data.category.type.charAt(0) + data.category.type.slice(1).toLowerCase()} title is required`)
                .min(3, "Category title must be at least 3 characters"),
            volume: yup.string(),
            issue: yup.string(),
            pages: yup.string(),
            publisher: yup.string()
        })
    })

    const handleSubmit = (values) => {
        next(values, true);
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You will lose your progress
        </Tooltip>
    )

    return(
        <>
            <Formik
                enableReinitialize 
                validationSchema={stepTwoValidationSchema}
                onSubmit={handleSubmit}
                initialValues={data}      
            >
                {({ handleSubmit, handleChange, values, touched, errors, setValues }) => 
                (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group>
                             <div className="text-center">
                                 <ButtonGroup toggle>
                                     {Object.keys(CATEGORY_TYPE).map((category, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            variant="outline-secondary"
                                            value={category.toUpperCase()}
                                            checked={values.category.type === category.toUpperCase()}
                                            onChange={(e) => setValues({...values, category:{...values.category, type: e.currentTarget.value}})}
                                        >
                                            {category}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> {Object.keys(CATEGORY_TYPE).find(category => category.toUpperCase() === values.category.type)} </Form.Label>
                            <Form.Control
                                type="text"
                                name="category.categoryTitle"
                                placeholder={Object.keys(CATEGORY_TYPE).find(category => category.toUpperCase() === values.category.type)}
                                value={values.category.categoryTitle}
                                onChange={handleChange}
                                isInvalid={touched.category && touched.category.categoryTitle && errors.category && errors.category.categoryTitle}
                            />
                            <Form.Control.Feedback type="invalid">{errors.category && errors.category.categoryTitle}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Volume </Form.Label>
                            <Form.Control
                                type="text"
                                name="category.volume"
                                placeholder="Volume"
                                value={values.category.volume}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Issue </Form.Label>
                            <Form.Control
                                type="text"
                                name="category.issue"
                                placeholder="Issue"
                                value={values.category.issue}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Pages </Form.Label>
                            <Form.Control
                                type="text"
                                name="category.pages"
                                placeholder="Pages"
                                value={values.category.pages}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Publisher </Form.Label>
                            <Form.Control
                                type="text"
                                name="category.publisher"
                                placeholder="Publisher"
                                value={values.category.publisher}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Row>
                            <div className="ml-3">
                                <OverlayTrigger
                                    trigger={["hover", "focus"]}
                                    placement="bottom"
                                    overlay={renderTooltip}
                                >
                                    <Button className="mr-2" variant="outline-danger" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </OverlayTrigger>
                            </div>

                            <div className="ml-auto mr-3">
                                <Button variant="outline-primary" className="mr-2" onClick={() => prev(values)}> Back </Button>
                                <Button type="submit"> Confirm </Button>
                            </div>
                        </Row>

                    </Form>
                )}
            </Formik>
        </>

    )
}

export default PageTwo