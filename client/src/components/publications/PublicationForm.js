import React, {useState} from 'react'
import { Button, Form, FormGroup, Tooltip, OverlayTrigger, Row, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { updatePublication, createPublication } from '../../actions/publications'

const PublicationForm = (props) => {
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(year-1899),( val, index) => year - index);
    const linkPrefix = "https://"

    const initialState = {
        title: "",
        description: "",
        authors: [],
        yearPublished: "",
        link: linkPrefix,
        teamId: "606bb59c22201f529db920c9" // teamId should be get from redux state later
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
          event.preventDefault()
          event.stopPropagation()
        } else{
            if (props.type === "update"){
                dispatch(updatePublication(props.pub._id, formInput))
            } else if (props.type === "create"){
                dispatch(createPublication(formInput))
            }
            props.closeModal()    
        }
        setValidated(true)
        event.preventDefault()
    }

    const renderAuthors = () =>{
        return(
            formInput.authors.map((author, index) => 
                <InputGroup key={index}>
                    <Form.Control
                        placeholder="Author"
                        required
                        minLength="1"
                        type="text"
                        value={formInput.authors[index]}
                        onChange={(event) => {
                            let newAuthors = formInput.authors
                            newAuthors[index] = event.target.value
                            setFormInput({...formInput, authors: newAuthors})
                        }}
                    />
                    <InputGroup.Append>
                        <Button 
                            variant="outline-secondary" 
                            onClick={() => {
                                let newAuthors = formInput.authors
                                newAuthors.splice(index, 1)
                                setFormInput({...formInput, authors: newAuthors})
                            }}
                        >
                            Remove
                        </Button>
                    </InputGroup.Append>
                    <Form.Control.Feedback type="invalid">
                        Authors must not be empty
                    </Form.Control.Feedback>
                </InputGroup>
            )
        )
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
                <Form.Label>Year Published</Form.Label>
                <Form.Control 
                    as="select" 
                    required
                    value={formInput.yearPublished}
                    onChange={handleOnChange("yearPublished")}
                >
                    {
                        years.map((year, index) => {
                        return <option key={`year${index}`} value={year}>{year}</option>
                        })
                    }
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Please enter a validated year
                </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    required
                    as="textarea" 
                    minLength="5"
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
                <Form.Label>Authors </Form.Label>
                { renderAuthors()}
                <InputGroup>
                    <Button 
                        variant="secondary" 
                        onClick={() => { setFormInput({...formInput, authors: [...formInput.authors, ""]})}}
                    > 
                        Add Author 
                    </Button>     
                </InputGroup>
            </FormGroup>
            
            <FormGroup>
                <Form.Label> Link</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Link" 
                    value={formInput.link}
                    onChange={(event)=>{
                        setFormInput({...formInput, link: linkPrefix + event.target.value.substr(linkPrefix.length)})
                      }}
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