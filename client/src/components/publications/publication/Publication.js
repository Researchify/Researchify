import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { deletePublication } from '../../../actions/publications'
import PublicationForm from '../PublicationForm'
import { Button, Modal, OverlayTrigger, Tooltip, ButtonGroup, Accordion, Card, Row } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiOutlineClose, AiOutlineMore } from 'react-icons/ai'
import { BsThreeDotsVertical, BsLink45Deg, BsArrowDown } from 'react-icons/bs'

const Publication = ({pub}) => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)
    
    const handleDelete = () => {
        dispatch(deletePublication(pub._id))
        setShowDeleteMessage(false)
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You will lose your progress
        </Tooltip>
    )

    const displayOptions = (
        <ButtonGroup>
            <Button onClick={() => setShowUpdateForm(true)} variant="outline-primary" data-toggle="modal"> <AiFillEdit /> </Button>
            <Button onClick={() => setShowDeleteMessage(true)} variant="outline-danger" data-toggle="modal"><AiFillDelete /></Button>
        </ButtonGroup>
    )
  
    return (
        <div>
            <Accordion>
                <Card.Header>
                    <Row>
                        <h3>{pub.title}</h3> 
                        <ButtonGroup className="ml-auto">
                            <Accordion.Toggle as={Button} eventKey="0">
                                <BsArrowDown />
                            </Accordion.Toggle>
                            <OverlayTrigger rootClose trigger="click" placement="right" overlay={displayOptions}>
                                <Button variant="light">
                                    <BsThreeDotsVertical />
                                </Button>  
                            </OverlayTrigger>
                        </ButtonGroup>
                    </Row>
                </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <h4> <b>Description:</b> {pub.description} </h4>
                            <h4> <b>Authors:</b> {pub.authors.join(", ")} </h4>
                            <h4> <b>Year Published: </b>{pub.yearPublished} </h4>
                            <h4> <b>Created at:</b> {pub.createdAt} </h4>
                            <h4> <b>Updated at:</b> {pub.updatedAt} </h4>
                            <Button onClick={()=> window.location.href = `${pub.link}`}>
                                <BsLink45Deg />
                            </Button>
                        </Card.Body>
                    </Accordion.Collapse>
            </Accordion>

            <Modal show={showUpdateForm}>
                <Modal.Header>
                    <Modal.Title>
                        Edit Publication
                        <OverlayTrigger
                            trigger="hover"
                            placement="right"
                            overlay={renderTooltip}
                        >
                            <Button className="float-right" variant="light" onClick={() => setShowUpdateForm(false)}> <AiOutlineClose /> </Button>
                        </OverlayTrigger>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="update" pub={pub} closeModal={() => setShowUpdateForm(false)}/>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteMessage}>
                <Modal.Header>
                    <Modal.Title> Delete Publication 
                        <Button className="float-right" variant="light" onClick={() => setShowDeleteMessage(false)}> <AiOutlineClose /> </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this publication? 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}> Confirm </Button>
                    {/* TODO onClick={} */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Publication