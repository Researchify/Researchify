import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux'
import { Row, InputGroup, Button, Form, Spinner } from "react-bootstrap";
import { importPublication } from "../../../actions/publications"
import { BsFillPersonFill } from 'react-icons/bs'

const ProfileLinkPage = ({closeModal}) => {
    const dispatch = useDispatch()

    const validationSchema = yup.object({
        profileLink: yup.string().required("Please provide Google Scholar Profile Link")
    })
    const initValues = {
        profileLink: ""
    }

    const submitForm = (profileLink) => {
        console.log(profileLink)
        dispatch(importPublication(profileLink))
    }

    return(
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

export default ProfileLinkPage