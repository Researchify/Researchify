import { Formik } from "formik";
import * as yup from "yup";
import { Row, InputGroup, Button, Tooltip, OverlayTrigger, Form} from "react-bootstrap";
import { updatePublication, createPublication } from '../../actions/publications'
import { useDispatch } from 'react-redux';

const schema = yup.object({
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    yearPublished: yup.string().required(),
    authors: yup.array().of(yup.string().required("Authors must not be empty")).required("Author is required"), 
    description: yup.string().required("Description is required").min(5, "Description must be at least 5 characters"),
    link: yup.string().required("Link is required").url("Link URL provided is not a valid URL, including the protocol (http/https)"),
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

    const renderAuthors = (values, touched, errors, handleChange, setValues) => {
        return(
            values.authors.map((author, index) => (
                <InputGroup key={index}>
                    <Form.Control 
                        type="text"
                        placeholder="Author"
                        name={`authors[${index}]`} 
                        value={values.authors[index]} 
                        onChange={handleChange}
                        isInvalid={touched.authors && errors.authors && errors.authors[index]}
                    />
                    <InputGroup.Append>
                        <Button 
                            onClick={()=>{
                                let newAuthors = values.authors
                                newAuthors.splice(index, 1)
                                setValues({...values, authors: newAuthors})
                            }}
                            variant="outline-secondary" 
                            disabled={values.authors.length === 1}
                        >
                            Remove
                        </Button>
                    </InputGroup.Append>  
                    <Form.Control.Feedback type="invalid">{errors.authors && errors.authors[index]}</Form.Control.Feedback>  
                </InputGroup>
            ))         
        )
    }

    return(
        <>
            <Formik
                enableReinitialize 
                validationSchema={schema}
                onSubmit={(values)=> onSubmit(values)}
                initialValues={props.type === "update" ? props.pub : initialValues}
            
            >
                {({ handleSubmit, handleChange, values, touched, errors, setValues }) => 
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
                            { renderAuthors(values, touched, errors, handleChange, setValues) }

                            <Button 
                                variant="secondary" 
                                onClick={()=> {
                                setValues({...values, authors: [...values.authors, ""]})
                                }
                            }>
                                Add Author
                            </Button>
                        </Form.Group>    

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                row={4} 
                                name="description"
                                placeholder="Description"
                                value={values.description}
                                onChange={handleChange}
                                isInvalid={touched.description && errors.description}
                            />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
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