import { Card, Row, Col, Button, Image, Modal, ButtonGroup, OverlayTrigger } from 'react-bootstrap'
import profilePic from './profilepic.jpg';
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IconContext } from "react-icons"
import TeamMemberForm from './form/TeamMemberForm';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const TeamMember = ({member}) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)

    const handleDelete = () => {
        //dispatch(deletePublication(pub._id))
        setShowDeleteMessage(false)
    }

    const displayOptions = (
        <ButtonGroup>
            <Button onClick={() => setShowUpdateForm(true)} variant="primary" data-toggle="modal"> <AiFillEdit /> </Button>
            <Button onClick={() => setShowDeleteMessage(true)} variant="danger" data-toggle="modal"><AiFillDelete /></Button>
        </ButtonGroup>
    )

    return(
        <>
            <Col className="container-fluid mt-4">
                <Card bg="light" style={{ width: '25rem' }}>
                    <Row>
                        <Col md={{ span: 2, offset: 10 }}>    
                            <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={displayOptions}>
                                <Button variant="default">
                                    <IconContext.Provider value={{ color: 'black', size: '20px' }}>
                                        <BsThreeDotsVertical />
                                    </IconContext.Provider>
                                </Button>  
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Image src={profilePic} roundedCircle height="184px" width="184px" style={{ alignSelf: 'center' }}/>     
                    <Card.Body>
                        <Card.Title>Milan P Allan</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Associate professor</Card.Subtitle>
                        <Card.Text>
                            Summary
                        </Card.Text>    
      
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={showUpdateForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> Edit Team Member </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeamMemberForm type="update" closeModal={() => setShowUpdateForm(false)}/>
                </Modal.Body>
            </Modal>

             <Modal show={showDeleteMessage}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> Delete Team Member </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this Team Member? 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setShowDeleteMessage(false)}> Cancel </Button>
                    <Button variant="danger" onClick={handleDelete}> Confirm </Button>
                </Modal.Footer>
            </Modal> 

        </>
    )
}

export default TeamMember