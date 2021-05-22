import { InputGroup, Form, Card, Collapse } from 'react-bootstrap';
import React, { useState } from 'react';

const ImportedPublication = ({pub, index, setChecked}) => {
    const [expand, setExpand] = useState(false)
    const dropDown = (
        <Collapse in={expand}>
            <div>
                <h6>  
                    {pub.category.type.charAt(0) + pub.category.type.slice(1).toLowerCase()}:  {pub.category.categoryTitle}
                </h6>
                { pub.category.issue && <h6> Issue: {pub.category.issue} </h6> }
                { pub.category.volume && <h6> Volume: {pub.category.volume} </h6> }
                { pub.category.pages && <h6> Pages: {pub.category.pages} </h6> }
                { pub.category.publisher && <h6> Publisher: {pub.category.publisher} </h6> }   
                <h6> Description: {pub.description} </h6>
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
                    <h6> Year pulished: {pub.yearPublished} </h6>
                    { dropDown }
                </Card.Body>
            </Card>
        </>
    )
}

export default ImportedPublication