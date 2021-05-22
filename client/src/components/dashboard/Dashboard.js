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
import { BsPencilSquare, BsServer, BsDisplayFill, BsChevronRight, BsChevronLeft, BsCheck } from 'react-icons/bs'
/** css **/
import './Dashboard.css'
// import DashboardModal from './DashboardModal'
import homeTemplateImg1 from '../../images/home_page_template1.jpg'
import homeTemplateImg2 from '../../images/home_page_template2.jpg'

const Dashboard = () => {

    const [githubModal, setShowGithub] = useState(false);
    const [template1, setShowTemplate1] = useState(false);
    const [template2, setShowTemplate2] = useState(false);

    const closeGithubModal = () => setShowGithub(false);
    const closeTemplate1 = () => setShowTemplate1(false);
    const closeTemplate2 = () => setShowTemplate2(false);

    const showGithubModal = () => setShowGithub(true);
    const showTemplate1 = () => setShowTemplate1(true);
    const showTemplate2 = () => setShowTemplate2(true);

    const dispatch = useDispatch();
    const websiteIsCreated = useSelector(state => state.website.isCreated);

    return (

        <Container fluid className="researchify-dashboard-container">
            <Card className="text-center researchify-dashboard-card">

                <Card.Body>
                    <Button onClick={showGithubModal}>
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

            {/*'Entering User GitHub Pages Token'*/}
            <Modal show={githubModal} onHide={closeGithubModal}  centered size="lg">
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
                        closeGithubModal();
                        showTemplate1()
                    }}>
                        Next
                            </Button>
                </Modal.Footer>
            </Modal>
            
            {/*'Selecting Template 1 Modal'*/}
            <Modal show={template1} onHide={closeTemplate1}  centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Select a template
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={homeTemplateImg1} className="img-fluid"/>
                    <p>
                    Option 1: Light minimalist design with blue and white accents.
                    </p>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button onClick={() => {dispatch(createWebsite());
                    closeTemplate1()}}
                    className="mr-auto">
                        <BsCheck />
                    </Button>
                    <Button variant="secondary"
                        onClick={() => {
                        closeTemplate1();
                        showTemplate2()}}
                    >
                        <BsChevronRight />
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*'Selecting Template 2 Modal'*/}
            <Modal show={template2} onHide={closeTemplate2}  centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Select a template
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={homeTemplateImg2} className="img-fluid"/>
                    <p>
                    Option 2: Dark minimalist design with blue and black accents.
                    </p>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button onClick={() => {dispatch(createWebsite());
                    closeTemplate2()}}
                    className="mr-auto">
                        <BsCheck />
                    </Button>
                    <Button variant="secondary"
                        onClick={() => {
                        showTemplate1();
                        closeTemplate2()}}
                    >
                        <BsChevronLeft />
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </Container>
    )
}

export default Dashboard
