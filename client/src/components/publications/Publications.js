/**
 * The Publications component displays a list of publications 
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPublicationsByTeamId } from '../../actions/publications'
import { Button, Modal, InputGroup, FormControl, Dropdown, Container, Col, Row } from 'react-bootstrap';
import PublicationForm from './form/PublicationForm'
import { BsFillPersonFill, BsArrowUpDown } from 'react-icons/bs'
import { VscAdd } from 'react-icons/vsc'
import { IconContext } from "react-icons"
import './publications.css'
import AllPublications from './publicationsLayout/AllPublications';
import ByCategory from './publicationsLayout/ByCategory';

const Publications = () => {
    const dispatch = useDispatch();
    const { teamId } = useParams();
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showImportForm, setShowImportForm] = useState(false)

    const allLayouts = ["All Publications", "By Category"]
    const [layout, setLayout] = useState("All Publications")

    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [dispatch, teamId]);

    const teamPublications = useSelector(state => state.publications)

    const renderPublications = () => {
        if (layout === "All Publications"){
            return(
                <AllPublications teamPublications={teamPublications} />
            )
        } else if (layout === "By Category"){
            return(
                <ByCategory teamPublications={teamPublications} />
            )
        }
    }

    return (
        <> 
            <Container className="mt-4">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className="mb-3 mt-3 text-center">
                            <Button className="ml-2 mr-2" onClick={() => setShowCreateForm(true)}>    
                                <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                                    <VscAdd />
                                </IconContext.Provider>
                            </Button>
                            <Button className="ml-2 mr-2"  onClick={() => setShowImportForm(true)}> 
                                <IconContext.Provider value={{ color: 'black', size: '30px' }}>
                                    <BsArrowUpDown /> 
                                </IconContext.Provider>
                            </Button>
                        </div>
                    </Col>

                    <Col md={{ span: 2, offset: 2}}>
                        <div className="mb-3 mt-3 text-center">
                            <h5 className="ml-2"> Choose layout: </h5>
                            <Dropdown>
                                <Dropdown.Toggle variant="light" className="ml-2 mr-2">
                                    {layout}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        allLayouts.map(layout => 
                                            <Dropdown.Item as="button"onClick={()=>setLayout(layout)}>{layout}</Dropdown.Item>
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

            <Modal show={showCreateForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> New Publication </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="create" closeModal={() => setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal>

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