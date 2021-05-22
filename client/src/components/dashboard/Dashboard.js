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
import { BsPencilSquare, BsServer, BsDisplayFill, BsChevronRight, BsChevronLeft, BsCheck } from 'react-icons/bs'
/** css **/
import './Dashboard.css'
// import DashboardModal from './DashboardModal'
import homeTemplateImg1 from '../../images/home_page_template1.jpg'
import homeTemplateImg2 from '../../images/home_page_template2.jpg'

const Dashboard = () => {

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const handleCloseOne = () => setShow1(false);
    const handleCloseTwo = () => setShow2(false);
    const handleCloseThree = () => setShow3(false);

    const handleShowOne = () => setShow1(true);
    const handleShowTwo = () => setShow2(true);
    const handleShowThree = () => setShow3(true);


    const dispatch = useDispatch();
    const websiteIsCreated = useSelector(state => state.website.isCreated);

    return (

        <Container fluid className="researchify-dashboard-container">
            <Card className="text-center researchify-dashboard-card">

                <Card.Body>
                    <Button  onClick={handleShowOne}>
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
            <Modal show={show1} onHide={handleCloseOne}  centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Select a template
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button onClick={() => {
                    handleCloseOne();
                    handleShowTwo()}}>
                        Next
                        </Button>
                </Modal.Footer>
            </Modal>
            
            {/*'Selecting Template 1 Modal'*/}
            <Modal show={show2} onHide={handleCloseTwo}  centered size="lg">
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
                    handleCloseTwo()}}
                    className="mr-auto">
                        <BsCheck />
                    </Button>
                    <Button variant="secondary"
                        onClick={() => {
                        handleCloseTwo();
                        handleShowThree()}}
                    >
                        <BsChevronRight />
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*'Selecting Template 2 Modal'*/}
            <Modal show={show3} onHide={handleCloseThree}  centered size="lg">
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
                    handleCloseThree()}}
                    className="mr-auto">
                        <BsCheck />
                    </Button>
                    <Button variant="secondary"
                        onClick={() => {
                        handleShowTwo();
                        handleCloseThree()}}
                    >
                        <BsChevronLeft />
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </Container>
    )
}

export default Dashboard
