/**
 * The Publications component displays a list of publications 
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPublicationsByTeamId } from '../../actions/publications'
import { Button, Modal, InputGroup, FormControl, Dropdown, Container, Col, Row } from 'react-bootstrap';
import PublicationForm from './form/PublicationForm'
import { BsFillPersonFill, BsArrowUpDown } from 'react-icons/bs'
import { VscAdd } from 'react-icons/vsc'
import { IconContext } from "react-icons"
import './publications.css'
import LayoutAllPublications from './publicationsLayout/LayoutAllPublications';
import LayoutByCategory from './publicationsLayout/LayoutByCategory';

const Publications = () => {
    const dispatch = useDispatch()
    const teamId = useSelector(state => state.team.teamId)
    const allLayouts = {
        allPublications: "All Publications",
        byCategory: "By Category"
    } 
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showImportForm, setShowImportForm] = useState(false)
    const [layout, setLayout] = useState(allLayouts.allPublications)

    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [dispatch, teamId]);

    const teamPublications = useSelector(state => state.publications)

    console.log(teamPublications)

    const renderPublications = () => {
        switch(layout){
            case allLayouts.byCategory:
                return <LayoutByCategory teamPublications={teamPublications} />
            default:
                return <LayoutAllPublications teamPublications={teamPublications} />
        }
    }

    return (
        <> 
            <Container className="mt-4">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className="mb-3 mt-3 text-center">
                            <Button className="ml-2 mr-2" onClick={() => setShowCreateForm(true)}>    
                                Add Publication
                            </Button>
                            <Button className="ml-2 mr-2" onClick={() => setShowImportForm(true)}> 
                                Import Publication
                            </Button>
                        </div>
                    </Col>

                    <Col md={{ span: 2, offset: 2}}>
                        <div className="mb-3 mt-3 text-center">
                            <Dropdown>
                                <Dropdown.Toggle variant="light" className="ml-2 mr-2">
                                    Layout: {layout}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        Object.keys(allLayouts).map(layout => 
                                            <Dropdown.Item as="button"onClick={()=>setLayout(allLayouts[layout])}>
                                                {allLayouts[layout]}
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className="text-center">
                <h4>
                    Total of {teamPublications.length} publications
                </h4>
            </div>

            { renderPublications() }

            {/* A modal for showing create publication form */}
            <Modal show={showCreateForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> New Publication </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="create" closeModal={() => setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal>
            
            {/* A modal for showing import publication form */}
            <Modal show={showImportForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> Import from Google Scholar </Modal.Title>
                </Modal.Header >
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Google Scholar Profile Link"/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => setShowImportForm(false)}> Cancel </Button>
                    <Button> Confirm </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Publications