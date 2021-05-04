import { Formik, FieldArray, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { Row, InputGroup, Button, Tooltip, OverlayTrigger} from "react-bootstrap";
import { updatePublication, createPublication } from '../../actions/publications'
import { useDispatch } from 'react-redux';

const schema = yup.object({
    title: yup.string().required().min(3, "at least 3 characters"),
    yearPublished: yup.string().required(),
    authors: yup.array().of(yup.string().required("author can't be empty")), 
    description: yup.string().required().min(5, "at least 5 characters"),
    link: yup.string().required().url("Please provide a valid url"),
  })

const initialValues = {
    title: "",
    yearPublished: (new Date()).getFullYear().toString(),
    authors: [""],
    description: "",
    link: "",
    teamId: "606bb59c22201f529db920c9" // teamId should be get from redux state later
}


const PublicationForm = (props) => {

    const dispatch = useDispatch()
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(year-1899),( val, index) => year - index);
    
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You will lose your progress
        </Tooltip>
    )

    const onSubmit = (values) => {
        console.log(values)
        if (props.type === "update"){
            dispatch(updatePublication(props.pub._id, values))
        } else if (props.type === "create"){
            dispatch(createPublication(values))
        }
        props.closeModal() 
    }

    return(
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(values)=> onSubmit(values)}
                initialValues={props.type === "update" ? props.pub : initialValues}
            
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => 
                (

                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                    as="textarea"
                                    row={2}
                                    name="title"
                                    placeholder="Title"
                                    value={values.title}
                                    onChange={handleChange}
                                    isInvalid={touched.title && errors.title}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Published Year</Form.Label>
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
                        <Form.Label>Authors </Form.Label>
                        <FieldArray name='authors' className="form-control">
                            {
                                fieldArrayProps => {
                                const { push, remove, form } = fieldArrayProps
                                const { values } = form
                                const { authors } = values
                                return (
                                    <div>
                                        {
                                            authors.map((author, index) => (
                                            <InputGroup key={index}>
                                                <Field name={`authors[${index}]`} required/>
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" disabled={authors.length === 1} onClick={() => remove(index)}>
                                                        Remove
                                                    </Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                    ))}
                                    <Form.Control
                                        isInvalid={touched.authors && errors.authors}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.authors}
                                    </Form.Control.Feedback>

                                    <div> {errors.authors} </div>
                                    <Button  variant="secondary" className="mt-2" onClick={() => push('')}>
                                        Add Author
                                    </Button>
                                    </div>
                                )}
                            }
                            
                        </FieldArray>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                row={3}     // why not working????
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


                        <Form.Group>
                            <Form.Label>link</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="link"
                                    placeholder="link"
                                    value={values.link}
                                    onChange={handleChange}
                                    isInvalid={touched.link && errors.link}
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.link}
                            </Form.Control.Feedback>
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
                                <Button type="submit">Confirm</Button>
                            </div>
                        </Row>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default PublicationForm