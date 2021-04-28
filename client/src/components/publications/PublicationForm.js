import React, {useState} from 'react'
import { Button, Form, FormGroup, Tooltip, OverlayTrigger, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { updatePublication, createPublication } from '../../actions/publications'

const PublicationForm = (props) => {
    const initialState = {
        title: "",
        description: "",
        authors: "",
        yearPublished: "",
        link: "",
        teamId: "606bb59c22201f529db920c9"
    }

    const [validated, setValidated] = useState(false)
    const [formInput, setFormInput] = useState(props.type === "update" ? props.pub : initialState)
    const dispatch = useDispatch();

    const handleOnChange = (key) => (event) => {
        setFormInput({...formInput, [key]: event.target.value})
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You will lose your progress
        </Tooltip>
    )

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        event.preventDefault();
    
        setValidated(true);


        // props.closeModal()
        // let author_arr
        // if (typeof form.authors === "object"){
        //     author_arr = form.authors[0].split(',')
        // } else{
        //     author_arr = form.authors.split(',')
        // }
        // setForm({ ...form, authors: author_arr })



        if (props.type === "update"){
            console.log("update pub")
            dispatch(updatePublication(props.pub._id, formInput))
        } else if (props.type === "create"){
            console.log("create pub")
            console.log("!!!!!!!!!!!!!!", formInput)
            dispatch(createPublication(formInput))
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FormGroup>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    required
                    minLength="3"
                    as="textarea" 
                    rows={2}
                    placeholder="Title" 
                    value={formInput.title}
                    onChange={handleOnChange("title")}
                />
                <Form.Control.Feedback type="invalid">
                    Title must be at least 3 characters
                </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    required
                    minLength="5"
                    as="textarea" 
                    rows={4}
                    placeholder="Description" 
                    value={formInput.description}
                    onChange={handleOnChange("description")}
                />
                <Form.Control.Feedback type="invalid">
                    Description must be at least 5 characters
                </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Authors (spearated by comma) </Form.Label>
                <Form.Control 
                    required
                    minLength="1"
                    type="text" 
                    placeholder="Authors" 
                    value={formInput.authors}
                    onChange={handleOnChange("authors")}
                />
                <Form.Control.Feedback type="invalid">
                    Authors must not be empty
                </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Year Published</Form.Label>
                <Form.Control 
                    required
                    minLength="4"
                    type="text" 
                    placeholder="Year Published" 
                    value={formInput.yearPublished}
                    onChange={handleOnChange("yearPublished")}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a validated year
                </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label> Link</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Link" 
                    value={formInput.link}
                    onChange={handleOnChange("link")}
                />
            </FormGroup>

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

                    <Button type="submit" variant="primary"> Confirm </Button>
                </div>
            </Row>
        </Form> 
    )
}

export default PublicationForm 