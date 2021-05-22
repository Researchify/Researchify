import React, {useState} from 'react'
import { Container, Button, Modal, Image } from "react-bootstrap"

import './Dashboard.css'
import DashboardModal from './DashboardModal'
import homeTemplateImg from '../../images/home_page_template.jpg'

const Dashboard = () => {

    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <main>                
            <Container fluid>
                You are currently viewing dashboard page.
                <Button onClick={handleShow}>
                    Build a Website
                </Button>
                <Modal show={show} onHide={handleClose} dialogClassName="dashboard-modal" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Centered Modal</h4>
                        <p>
                            <Image src={homeTemplateImg}/>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </main>
    )
}

export default Dashboard
