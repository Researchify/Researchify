import { InputGroup, Form, Card, Collapse } from 'react-bootstrap';
import React, { useState } from 'react';

const ImportedPublciation = ({pub, index, setChecked}) => {
    const [expand, setExpand] = useState(false)
    const dropDown = (
        <Collapse in={expand}>
            <div>
                <h6> Year pulished: {pub.yearPublished} </h6>
                <h6>  
                    {pub.category.type.charAt(0) + pub.category.type.slice(1).toLowerCase()}:  {pub.category.categoryTitle}
                </h6>
                <h6> Link: {pub.link} </h6>
            </div>
        </Collapse>
    )
    
    const handleChange = () => {
        setChecked(index)
        setExpand(expand)
    }

    return(
        <>
            <Card onClick={() => setExpand(!expand)}>
                <Card.Body>
                    <InputGroup>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" defaultChecked="true" onChange={handleChange}/>
                            </Form.Group>
                        </Form>
                        <Card.Title> Title: {pub.title} </Card.Title>
                    </InputGroup>
                    <Card.Subtitle className="mb-2 text-muted"> Authors: {pub.authors.map((author) => `${author}`).join(', ')} </Card.Subtitle>
                    <h6> Description: {pub.description} </h6>
                    { dropDown }
                </Card.Body>
            </Card>
        </>
    )
}

export default ImportedPublciation