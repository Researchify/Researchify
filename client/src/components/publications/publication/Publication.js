/**
 * The Publications component displays a publication details
 */

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { deletePublication } from '../../../actions/publications'
import PublicationForm from '../form/PublicationForm'
import { Button, Modal, OverlayTrigger, ButtonGroup, Row, Col, Collapse  } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { BsThreeDotsVertical, BsLink45Deg } from 'react-icons/bs'
import { GrLinkDown, GrLinkUp } from 'react-icons/gr'
import { IconContext } from "react-icons"
import '../publications.css'

const Publication = ({pub}) => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)
    const [open, setOpen] = useState(false)
    
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
            open &&            
            <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                <GrLinkUp className="ml-3"/>
            </IconContext.Provider>
        )
    }

    const displayDownArrow = () => {
        return(
            !open && 
            <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                <GrLinkDown onClick={() => setOpen(!open)} className="ml-2"/>
            </IconContext.Provider>
        )
    }

    const dropDown = (
        <Collapse in={open}> 
            <div className="mb-3 ml-3 mr-2">
                <h5> <b>Description:</b> {pub.description} </h5>
                <h5> <b>{pub.category.type.charAt(0) + pub.category.type.slice(1).toLowerCase()}:</b> {pub.category.categoryTitle} </h5>
                { pub.category.issue && <h5> <b>Issue:</b> {pub.category.issue} </h5> }
                { pub.category.volume && <h5> <b>Volume:</b> {pub.category.volume} </h5> }
                { pub.category.pages && <h5> <b>Pages:</b> {pub.category.pages} </h5> }
                { pub.category.publisher && <h5> <b>Publisher:</b> {pub.category.publisher} </h5> }
                  
                <Row>
                    <Col md={11}>
                        {   
                            pub.link &&
                            <Button onClick={() => window.open(`${pub.link}`, '_blank')}>
                                <IconContext.Provider value={{ color: 'black', size: '25px' }}>
                                    <BsLink45Deg />
                                </IconContext.Provider>
                            </Button>
                        }                                      
                    </Col>
                    <Col md={1}>
                        <span onClick={() => setOpen(!open)}>
                            {displayUpArrow()}
                        </span>
                    </Col>
                </Row>
            </div>
        </Collapse >
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
            
            <div className={open ? "ml-3 mt-3" : "ml-3 mt-3 mb-2"}>

                <h5><b> Authors: </b>{pub.authors.map((author) => `${author}`).join(', ')}</h5> 
                <Row>
                    <Col md={11}>
                        <h5 className={open?"":"blur"}> <b>Year Published: </b>{pub.yearPublished} </h5>
                    </Col>
                    <Col md={1}>
                        {displayDownArrow()}
                    </Col>
                </Row>             
            </div>

            { dropDown }

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