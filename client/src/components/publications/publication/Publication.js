import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { deletePublication } from '../../../actions/publications'
import PublicationForm from '../PublicationForm'
import { Button, Modal, OverlayTrigger, ButtonGroup, Accordion, Card, Row, Col } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { BsThreeDotsVertical, BsLink45Deg, BsArrowDown } from 'react-icons/bs'
import { GrLinkDown, GrLinkUp } from 'react-icons/gr'
import { IconContext } from "react-icons"
import '../publications.css'


const Publication = ({pub}) => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)
    const [clicked, setClicked] = useState(false)
    
    const handleDelete = () => {
        dispatch(deletePublication(pub._id))
        setShowDeleteMessage(false)
    }

    const displayOptions = (
        <ButtonGroup>
            <Button onClick={() => setShowUpdateForm(true)} variant="outline-primary" data-toggle="modal"> <AiFillEdit /> </Button>
            <Button onClick={() => setShowDeleteMessage(true)} variant="outline-danger" data-toggle="modal"><AiFillDelete /></Button>
        </ButtonGroup>
    )

    const displayDropdown = (
        <div className="mb-3 ml-3"> 
            <h4> <b>Description:</b> {pub.description} </h4>
            <h4> <b>Created at:</b> {pub.createdAt} </h4>
            <h4> <b>Updated at:</b> {pub.updatedAt} </h4>
            <Row>
                <Col md={11}>
                    <Button onClick={() => window.open(`${pub.link}`, '_blank')}>
                        <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                            <BsLink45Deg />
                        </IconContext.Provider>
                    </Button>
                </Col>
                <Col md={1}>
                    <span onClick={() => setClicked(!clicked)}>
                        {
                            clicked?               
                            <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                                <GrLinkUp className="ml-2"/>
                            </IconContext.Provider>: ""
                        }
                    </span>
                </Col>
            </Row>
        </div>
    )
    
    return (
        <>
            <div>
                <div>
                    <div className="modalHeader">
                        <Row>
                            <Col lg={11}>
                                <h3 className="ml-3 mt-3" style={{color: "dimgrey"}}>{pub.title}</h3> 
                            </Col>
                            <Col lg={1}>    
                                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={displayOptions}>
                                    <Button className="mt-3 mb-3" variant="default">
                                        <IconContext.Provider value={{ color: 'black', size: '20px' }}>
                                            <BsThreeDotsVertical />
                                        </IconContext.Provider>
                                    </Button>  
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </div>
                    
                    <div className="ml-3 mt-3 mb-3">
                        <h4><b> Authors: </b>{pub.authors}</h4> 
                        <Row>
                            <Col md={11}>
                                    <h4 className={clicked?"":"blur2"}> <b>Year Published: </b>{pub.yearPublished} </h4>
                            </Col>
                            <Col md={1}>
                                <span onClick={() => setClicked(!clicked)}>
                                    {clicked? "" : 
                                                <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                                                    <GrLinkDown className="ml-2"/>
                                                </IconContext.Provider>

                                    }
                                </span>
                            </Col>
                        </Row>             
                    </div>
                </div>
            </div>

            { clicked ? displayDropdown : null }

            {/* <Accordion>
                <Card.Header className="modalHeader">
                    <Row>
                        <Col lg={11} md={9} sm={8}>
                            <h3 style={{color: "dimgrey"}} className="ml-2 mr-2">{pub.title}</h3> 
                        </Col>
                        <Col lg={1} md={3} sm={4}>
                            <ButtonGroup>
                                <Accordion.Toggle as={Button} eventKey="0">
                                    <BsArrowDown />
                                </Accordion.Toggle>
                                <OverlayTrigger rootClose trigger="click" placement="right" overlay={displayOptions}>
                                    <Button variant="light">
                                        <BsThreeDotsVertical />
                                    </Button>  
                                </OverlayTrigger>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <h4> <b>Authors:</b> {pub.authors.join(", ")} </h4>
                            <h4> <b>Year Published: </b>{pub.yearPublished} </h4>
                            <h4 className="blur"> <b>Description:</b> {pub.description} </h4>
                            <h4> <b>Created at:</b> {pub.createdAt} </h4>
                            <h4> <b>Updated at:</b> {pub.updatedAt} </h4>
                            <Button onClick={() => window.open(`${pub.link}`, '_blank')}>
                                <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                                    <BsLink45Deg />
                                </IconContext.Provider>
                            </Button>
                        </Card.Body>
                    </Accordion.Collapse>
            </Accordion> */}

            <Modal show={showUpdateForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> Edit Publication </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="update" pub={pub} closeModal={() => setShowUpdateForm(false)}/>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteMessage}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> Delete Publication </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this publication? 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setShowDeleteMessage(false)}> Cancel </Button>
                    <Button variant="danger" onClick={handleDelete}> Confirm </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Publication