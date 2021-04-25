import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getPublicationsByTeamId } from '../../actions/publications'
import Header from '../layout/Header'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PublicationForm from './PublicationForm'
import { BsFillPersonFill } from 'react-icons/bs'


const Publications = () => {
    const dispatch = useDispatch();
    const { teamId } = useParams();
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showImportForm, setShowImportForm] = useState(false)

    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [teamId, dispatch]);

    const teamPublications = useSelector(state => state.publications.teamPublications)

    return (
        <div> 
            <Header />
            <h1> Team Publications 
            <Button onClick={() => setShowCreateForm(true)} variant="secondary" data-toggle="modal"> New Publication </Button>
            <Button onClick={() => setShowImportForm(true)} variant="secondary" data-toggle="modal"> Import Publication </Button> </h1>
            {
                teamPublications.map(pub => 
                    <div key={pub._id}>            
                        <h3> 
                            Title: <Link to={`/publications/${pub._id}`}>{pub.title} </Link>                       
                        </h3>
                        <h3> Description: {pub.description} </h3>
                        <h3> Authors: {pub.authors.join(", ")} </h3>
                        <h3> Link: {pub.link} </h3>
                        <br />
                    </div>
                )
            }

            <Modal show={showCreateForm} onHide={() => setShowCreateForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        New Publication
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="create" closeModal={() => setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal>

            <Modal show={showImportForm} onHide={() => setShowImportForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Import from Google Scholar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><BsFillPersonFill /></InputGroup.Text>
                    </InputGroup.Prepend>
                        <FormControl
                            placeholder="Google Scholar Profile Link"
                            // aria-label="Username"
                            // aria-describedby="basic-addon1"
                    />
                </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button> Confirm </Button>
                </Modal.Footer>
            </Modal>

            {/* <Modal show={showQuitCreateForm} onHide={() => setShowQuitCreateForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        New Publication
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="create" closeModal={() => setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal> */}


        </div>
    )
}

export default Publications