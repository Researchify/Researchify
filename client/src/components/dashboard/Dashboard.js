/**
 * This file exports the inner content of Researchify Dashboard Page
 */
import React, { useState } from 'react'
import { Container, Button, Modal, Image, CardGroup, Card, Form } from "react-bootstrap"

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

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleCloseOne = () => setShow1(false);
    const handleShowOne = () => setShow1(true);

    const handleCloseTwo = () => setShow2(false);
    const handleShowTwo = () => setShow2(true);


    const dispatch = useDispatch();
    const websiteIsCreated = useSelector(state => state.website.isCreated);

    return (

        <Container fluid className="researchify-dashboard-container">
            <Card className="text-center researchify-dashboard-card">

                <Card.Body>
                    <Button onClick={handleShowOne}>
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
            <Modal show={show1} onHide={handleCloseOne} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter your GitHub Credentials
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form className="researchify-github-form">

                        <Form.Group controlId="formGithubUsername">
                            <Form.Label>Github Username</Form.Label>
                            <Form.Control type="text" placeholder={"Enter your GitHub Username Here"} />
                        </Form.Group>

                        <Form.Group controlId="formGithubToken">
                            <Form.Label>Github Personal Access Token</Form.Label>
                            <Form.Control type="text" placeholder={"Enter your GitHub Personal Access Token Here"} />
                        </Form.Group>

                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => {
                        handleCloseOne();
                        handleShowTwo()
                    }}>
                        Next
                            </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleCloseTwo} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select a template
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <Image src={homeTemplateImg} className="img-fluid" />
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros. This is the second Modal
                        </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => {
                        dispatch(createWebsite());
                        handleCloseTwo()
                    }}>Select</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default Dashboard
