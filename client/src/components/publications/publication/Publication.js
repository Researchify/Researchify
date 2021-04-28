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
            <Button onClick={() => setShowUpdateForm(true)} variant="primary" data-toggle="modal"> <AiFillEdit /> </Button>
            <Button onClick={() => setShowDeleteMessage(true)} variant="danger" data-toggle="modal"><AiFillDelete /></Button>
        </ButtonGroup>
    )

    const displayUpArrow = () => {
        return(
            clicked?               
            <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                <GrLinkUp className="ml-2"/>
            </IconContext.Provider>: ""
        )
    }

    const displayDownArrow = () => {
        return(
            clicked? "" : 
            <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                <GrLinkDown className="ml-2"/>
            </IconContext.Provider>
        )
    }

    const dropDown = (
        <div className="mb-3 ml-3 mr-2"> 
            <h5> <b>Description:</b> {pub.description} </h5>
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
                        {displayUpArrow()}
                    </span>
                </Col>
            </Row>
        </div>
    )
    
    return (
        <>
            <div className="modalHeader">
                <Row>
                    <Col md={11}>
                        <h3 className="ml-3 mt-3">{pub.title}</h3> 
                    </Col>
                    <Col md={1}>    
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
            
            <div className={clicked?"ml-3 mt-3":"ml-3 mt-3 mb-2"}>
                <h5><b> Authors: </b>{pub.authors}</h5> 
                <Row>
                    <Col md={11}>
                        <h5 className={clicked?"":"blur2"}> <b>Year Published: </b>{pub.yearPublished} </h5>
                    </Col>
                    <Col md={1}>
                        <span onClick={() => setClicked(!clicked)}>
                            {displayDownArrow()}
                        </span>
                    </Col>
                </Row>             
            </div>

            { clicked ? dropDown : null }

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