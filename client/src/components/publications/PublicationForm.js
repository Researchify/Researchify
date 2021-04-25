import React, {useState} from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { updatePublication } from '../../actions/publications'

const PublicationForm = (props) => {
    const initialState = {
        title: "",
        description: "",
        authors: "",
        yearPublished: "",
        link: ""

    }
    const [form, setForm] = useState(props.type === "update" ? props.pub : initialState)
    const dispatch = useDispatch();

    const handleOnChange = (key) => (event) => {
        setForm({...form, [key]: event.target.value})
    }

    const handleClick = () => {
        props.closeModal()
        let author_arr = form.authors.split(',')
        console.log(author_arr)
        setForm({ ...form, authors: author_arr })
        if (props.type === "update"){
            dispatch(updatePublication(props.pub._id, form))
        } else if (props.type === "create"){
            console.log("create pub")
        }
    }

    return (
        <Form>
            <FormGroup>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    required
                    as="textarea" 
                    rows={2}
                    placeholder="Title" 
                    value={form.title}
                    onChange={handleOnChange("title")}
                />
            </FormGroup>

            <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    required
                    as="textarea" 
                    rows={4}
                    placeholder="Description" 
                    value={form.description}
                    onChange={handleOnChange("description")}
                />
            </FormGroup>

            <FormGroup>
                <Form.Label>Authors (spearated by comma) </Form.Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder="Authors" 
                    value={form.authors}
                    onChange={handleOnChange("authors")}
                />
            </FormGroup>

            <FormGroup>
                <Form.Label>Year Published</Form.Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder="Year Published" 
                    value={form.yearPublished}
                    onChange={handleOnChange("yearPublished")}
                />
            </FormGroup>

            <FormGroup>
                <Form.Label> Link</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Link" 
                    value={form.link}
                    onChange={handleOnChange("link")}
                />
            </FormGroup>

            <Button className="btn-lg btn-block" onClick={handleClick}>
                Confirm
            </Button>
        </Form> 
    )
}

export default PublicationForm 