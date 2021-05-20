import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from "formik";
import * as yup from "yup";
import { Row, InputGroup, Button, Form, Spinner } from "react-bootstrap";
import { BsFillPersonFill } from 'react-icons/bs'
import { importPublication } from "../../../actions/publications"
import ImportSucessPage from './ImportSuccessPage';

const ImportForm = ({closeModal}) => {
    const importedPublications = useSelector(state => state.importedPublications)
    const dispatch = useDispatch()
    const validationSchema = yup.object({
        profileLink: yup.string().required("Please provide Google Scholar Profile Link")
    })

    const submitForm = (profileLink) => {
        console.log(profileLink)
        dispatch(importPublication(profileLink))
    }

    const displayResult = () => {
        if(importedPublications.importStatus ==="SUCCESS"){
            return(
                <ImportSucessPage closeModal={closeModal}/>
            )
        } else if (importedPublications.importStatus ==="FAIL"){
            return(
                <div>
                    error
                </div>
            )
        }
    }

    const initValues = {
        profileLink: ""
    }

    return(
        importedPublications.loading?
        <div className="mb-3 mt-3 text-center">
            <Spinner animation="border" />
        </div>: 
            importedPublications.importStatus !== null?
        <div>
            {displayResult()}
        </div>

        :
        <Formik
            enableReinitialize 
            validationSchema={validationSchema}
            onSubmit={submitForm}
            initialValues={initValues}      
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => 
                (
                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Group>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                type="text"
                                name="profileLink"
                                placeholder="Profile Link"
                                value={values.profileLink}
                                onChange={handleChange}
                                isInvalid={touched.profileLink && errors.profileLink}
                                />
                                <Form.Control.Feedback type="invalid">{errors.profileLink}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Row>
                            <div className="ml-auto mr-3">
                                <Button className="mr-2" variant="outline-danger" onClick={closeModal}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit"> Confirm </Button>
                            </div>
                        </Row>

                    </Form>                 
                )}

        </Formik>
    )
}

export default ImportForm