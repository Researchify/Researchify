import React, {useState} from "react"
import {Container,Accordion, Card, InputGroup, Form, Button, Modal, Navbar, Nav, Carousel} from "react-bootstrap"
import {BsFillPlusCircleFill} from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import "./editorHome.css"
import HomeSectionCard from  "./HomeSectionCard.js"

const EditorHome = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [header, setHeader] = useState(null);
    const [sHeader, setSHeader] = useState(null);
    const [teamBio, setTeamBio] = useState(null);
    const [teamVision, setTeamVision] = useState(null);
    const [research, setResearch] = useState(null);
    const [publications, setPublications] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);

    const homePageUpdated = () => {
        toast.success('Page has been successfully updated')
    }

    return (
        <>
            <Container className="editor-home-container border">

                {/* Add home page editor template Viewer here */}

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">{header}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link> <Link className='template_basic_nav_link' to='home'>Home </Link> </Nav.Link>
                        <Nav.Link> <Link className='template_basic_nav_link' to='publications'>Publications </Link></Nav.Link>
                        <Nav.Link> <Link className='template_basic_nav_link' to='awards'>Awards </Link> </Nav.Link>
                        <Nav.Link> <Link className='template_basic_nav_link' to='team'>Team </Link> </Nav.Link>
                        <Nav.Link> <Link className='template_basic_nav_link' to='/contact'>Contact </Link></Nav.Link>
                    </Nav>
                </Navbar>
                {/* Carousel will be made a separate component */}
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.pinimg.com/originals/81/41/b8/8141b84f2bb2f78ad48c3c5bdb582038.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Some Description</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.pinimg.com/originals/81/41/b8/8141b84f2bb2f78ad48c3c5bdb582038.jpg"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Some Description</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.pinimg.com/originals/81/41/b8/8141b84f2bb2f78ad48c3c5bdb582038.jpg"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Some Description</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                <Button variant="primary" block onClick={handleShow} > Edit Sections
                    {" "}<BsFillPlusCircleFill />
                </Button>

                {/*Display Cards*/}
                <HomeSectionCard info={{title: "Biography", content: teamBio}} />

                <HomeSectionCard info={{title: "Team Vision", content: teamVision}} />
                <HomeSectionCard info={{title: "Contact Information", content: contactInfo}} />'

            {/* Modal popup for home page editor text form */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Home Page Editor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            Header
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Research group name</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" aria-label="With textarea" onChange={e => setHeader(e.target.value)} type="text"/>
                                    </InputGroup>
                                </Form.Group>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                            Sub-header
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>Add description</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control as="textarea" aria-label="With textarea" onChange={e => setSHeader(e.target.value)} type="text"/>
                                </InputGroup>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                            Team Biography
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Team biography</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" aria-label="With textarea" onChange={e => setTeamBio(e.target.value)} type="text"/>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Team vision</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" aria-label="With textarea" onChange={e => setTeamVision(e.target.value)} type="text"/>
                                    </InputGroup>
                                </Form.Group>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                            Research
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>Research Highlights</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control as="textarea" aria-label="With textarea" onChange={e => setResearch(e.target.value)} type="text"/>
                                </InputGroup>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4">
                            Publications
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>Journal Articles</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control as="textarea" aria-label="With textarea" onChange={e => setPublications(e.target.value)} type="text"/>
                                </InputGroup>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="5">
                            Contact Info
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>Contact email</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control as="textarea" aria-label="With textarea" onChange={e => setContactInfo(e.target.value)} type="text"/>
                                </InputGroup>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Toaster />
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={homePageUpdated}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            </Container>
        </>
    )

}

export default EditorHome