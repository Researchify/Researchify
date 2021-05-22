/**
 * This file exports the inner content of Researchify Dashboard Page
 */
import React, {useState} from 'react'
import { Container, Button, Modal, Image,CardGroup, Card } from "react-bootstrap"

/** Redux **/
import { useDispatch, useSelector } from 'react-redux';
import { createWebsite } from '../../actions/website';

import { Link } from 'react-router-dom';

/** icons **/
import { BsPencilSquare, BsServer, BsDisplayFill } from 'react-icons/bs'
/** css **/
import './Dashboard.css'
// import DashboardModal from './DashboardModal'
import homeTemplateImg from '../../images/home_page_template.jpg'

const Dashboard = () => {

    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const websiteIsCreated = useSelector(state => state.website.isCreated);

    return (

        <Container fluid className="researchify-dashboard-container">
            <Card className="text-center researchify-dashboard-card">

                <Card.Body>
                    <Button  onClick={handleShow}>
                        {websiteIsCreated ? "Edit the Website" : "Build a new Website"}
                    </Button>
                </Card.Body>

                <Card.Body className="researchify-dashboard-card-description">
                    Click the button to enter Personal Acess Token and get started.
                </Card.Body>

                {/* Bottom layer of the three icons */}
                <CardGroup className="researchify-dashboard-card-group">
                    <Card>
                        <Link className="researchify-dashboard-card-link">
                            <Card.Body>
                                <BsPencilSquare className="researchify-dashboard-card-icons" />
                            </Card.Body>
                            <p>Editor</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link className="researchify-dashboard-card-link">
                            <Card.Body>
                                <BsServer className="researchify-dashboard-card-icons" />
                            </Card.Body>
                            <p>API Acess Manager</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link className="researchify-dashboard-card-link">
                            <Card.Body>
                                <BsDisplayFill className="researchify-dashboard-card-icons" />
                            </Card.Body>
                            <p>Website</p>
                        </Link>
                    </Card>
                </CardGroup>

            </Card>
            <Modal show={show} onHide={handleClose}  centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Select a template
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Centered Modal</h4>
                        <Image src={homeTemplateImg} className="img-fluid"/>
                        <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                        </p>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={() => {dispatch(createWebsite());
                        handleClose()}}>Select</Button>
                    </Modal.Footer>
                </Modal>
            
        </Container>
    )
}

export default Dashboard
