import { useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { getPublicationById, deletePublication } from '../../../actions/publications'
import PublicationForm from '../PublicationForm'
import { Button, Modal, OverlayTrigger, Tooltip, Container, ButtonGroup, Overlay, Accordion, Card } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit, AiOutlineClose, AiOutlineMore } from 'react-icons/ai'
import { BsThreeDotsVertical, BsLink45Deg } from 'react-icons/bs'
import styled from 'styled-components'

const AccordionSection = styled.div`
//   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

`;

const Publication = ({pub}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pubId } = useParams();
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)
    const [showOption, setShowOption] = useState(false)
    const target = useRef(null)
    // const [expanded, setExpanded] = useStateWithCallback(false)
    
    const handleDelete = () => {
        dispatch(deletePublication(pub._id))
        setShowDeleteMessage(false)
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You will lose your progress
        </Tooltip>
    )

    // const toggleExpander = (e) => {
    //     if (!expanded){
    //         setExpanded(true)
    //     }
    // }

    
    return (
        <div>
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <h3>{pub.title}</h3>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <h4> <b>Description:</b> {pub.description} </h4>
                            <h4> <b>Authors:</b> {pub.authors.join(", ")} </h4>
                            <h4> <b>Year Published: </b>{pub.yearPublished} </h4>
                            <h4> <b>Created at:</b> {pub.createdAt} </h4>
                            <h4> <b>Updated at:</b> {pub.updatedAt} </h4>
                            <h4> <b></b>Link: {pub.link} </h4>

                            {/* <Button variant="light" ref={target} onClick={() => setShowOption(!showOption)}>
                                <BsThreeDotsVertical />
                            </Button>    */}
                        <ButtonGroup>
                            <Button onClick={()=> window.location.href = `${pub.link}`}>
                                <BsLink45Deg />
                            </Button>
                            <Button onClick={() => setShowUpdateForm(true)} variant="outline-primary" data-toggle="modal"> <AiFillEdit /> </Button>
                            <Button onClick={() => setShowDeleteMessage(true)} variant="outline-danger" data-toggle="modal"><AiFillDelete /></Button>
                        </ButtonGroup>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

            <Overlay target={target.current} show={showOption} placement="right">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        ...props.style,
                        }}
                    >
                        <ButtonGroup>
                            <Button onClick={() => setShowUpdateForm(true)} variant="outline-primary" data-toggle="modal"> <AiFillEdit /> </Button>
                            <Button onClick={() => setShowDeleteMessage(true)} variant="outline-danger" data-toggle="modal"><AiFillDelete /></Button>
                        </ButtonGroup>
                    </div>
                )}
            </Overlay>

            <Modal show={showUpdateForm}>
                <Modal.Header>
                    <Modal.Title>
                        Edit Publication
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
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