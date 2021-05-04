import React, {useState} from 'react'
import { Button, Form, FormGroup, Tooltip, OverlayTrigger, Row, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { updatePublication, createPublication } from '../../actions/publications'
import { Formik, FieldArray, Field } from 'formik'
import * as Yup from 'yup';


const validateSchema = Yup.object({
    title: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .required('Title is required'),
    yearPublished: Yup.string(),
    description: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .required('Description is required'),
    authors: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),
    link: Yup.string()
        .url('Please provide a vaild url')
        .required('Link is required'),
  })

const initialValues = {
    title: "",
    description: "",
    authors: [""],
    yearPublished: "",
    link: "",
    teamId: "606bb59c22201f529db920c9" // teamId should be get from redux state later
}

const onSubmit = (values, submitProps) => {
    console.log('Form data', values)
    console.log('submitProps', submitProps)
    submitProps.setSubmitting(false)
    submitProps.resetForm()
  }


const PublicationForm = (props) => {
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(year-1899),( val, index) => year - index);
    const [formValues, setFormValues] = useState(props.type === "update" ? props.pub : initialValues)

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You will lose your progress
        </Tooltip>
    )

    console.log(formValues)

    return (
        <Formik
            initialValues={formValues}
            validationSchema={validateSchema}
            onSubmit={onSubmit}
        >
            {({
                handleChange,
                values,
                touched,
                errors,
        }) => (
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        as="textarea" 
                        rows={2}
                        name="title"
                        placeholder="Title" 
                        value={values.title}
                        onChange={handleChange}
                        isInvalid={touched.title && errors.title}
                    />
                    <Form.Control.Feedback  type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Year Published</Form.Label>
                    <Form.Control
                        as="select"
                        type="text"
                        name="yearPublished"
                        value={values.yearPublished}
                        onChange={handleChange}
                    >
                    {
                        years.map((year, index) => {
                            return <option key={`year${index}`} value={year}>{year}</option>
                        })
                    }
                    </Form.Control>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea" 
                        rows={4}
                        name="description"
                        placeholder="Description" 
                        value={values.description}
                        onChange={handleChange}
                        isInvalid={touched.description && errors.description}
                    />
                    <Form.Control.Feedback  type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <FormGroup>
                    <Form.Label>Authors </Form.Label>
                        <FieldArray name='authors'>
                            {fieldArrayProps => {
                            const { push, remove, form } = fieldArrayProps
                            const { values } = form
                            const { authors } = values
                            return (
                                <div>
                                {authors.map((authors, index) => (
                                    <div key={index}>
                                        <InputGroup>
                                            <Form.Control name={`authors[${index}]`} />
                                                <InputGroup.Append>
                                                    <Button disabled={values.authors.length === 1} variant="outline-secondary"  onClick={() => remove(index)}>
                                                        Remove
                                                    </Button>
                                                </InputGroup.Append>
                                        </InputGroup>
                                    </div>
                                ))}
                                <Button 
                                    variant="secondary" 
                                    onClick={() => push('')}
                                > 
                                    Add Author 
                                    </Button>  
                                </div>
                            )
                            }}
                        </FieldArray>
                <InputGroup>
   
                </InputGroup>
                </FormGroup>
                
                <Form.Group>
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                        type="text"
                        name="link"
                        placeholder="Link" 
                        value={values.link}
                        onChange={handleChange}
                        isInvalid={touched.link && errors.link}
                    />
                    <Form.Control.Feedback type="invalid">{errors.link}</Form.Control.Feedback>
                </Form.Group>

                 <Row>
                    <div className="ml-auto mr-3">
                        <OverlayTrigger
                            trigger={["hover", "focus"]}
                            placement="bottom"
                            overlay={renderTooltip}
                        >
                            <Button className="mr-2" variant="outline-danger" onClick={props.closeModal}>
                                Cancel
                            </Button>
                        </OverlayTrigger>
                        <Button type='submit' variant="primary"> Confirm </Button>
                    </div>
                </Row>
            </Form>
        )}

        </Formik>

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //       event.preventDefault()
    //       event.stopPropagation()
    //     } else{
    //         if (props.type === "update"){
    //             dispatch(updatePublication(props.pub._id, formInput))
    //         } else if (props.type === "create"){
    //             dispatch(createPublication(formInput))
    //         }
    //         props.closeModal()    
    //     }
    //     setValidated(true)
    //     event.preventDefault()
    // }

    // const renderAuthors = () =>{
    //     return(
    //         formInput.authors.map((author, index) => 
    //             <InputGroup key={index}>
    //                 <Form.Control
    //                     placeholder="Author"
    //                     required
    //                     minLength="1"
    //                     type="text"
    //                     value={formInput.authors[index]}
    //                     onChange={(event) => {
    //                         let newAuthors = formInput.authors
    //                         newAuthors[index] = event.target.value
    //                         setFormInput({...formInput, authors: newAuthors})
    //                     }}
    //                 />
    //                 <InputGroup.Append>
    //                     <Button 
    //                         disabled={formInput.authors.length === 1}
    //                         variant="outline-secondary" 
    //                         onClick={() => {
    //                             let newAuthors = formInput.authors
    //                             newAuthors.splice(index, 1)
    //                             setFormInput({...formInput, authors: newAuthors})
    //                         }}
    //                     >
    //                         Remove
    //                     </Button>
    //                 </InputGroup.Append>
    //                 <Form.Control.Feedback type="invalid">
    //                     Authors must not be empty
    //                 </Form.Control.Feedback>
    //             </InputGroup>
    //         )
    //     )
    // }
    )
}

export default PublicationForm 