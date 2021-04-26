import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPublicationsByTeamId } from '../../actions/publications'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PublicationForm from './PublicationForm'
import { BsFillPersonFill, BsArrowUpDown } from 'react-icons/bs'
import { MdAdd } from 'react-icons/md'
import Publication from './publication/Publication'
import './publications.css'


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
            <div className="mb-3 mt-3 text-center">
                <Button className="mr-1" size="lg" onClick={() => setShowCreateForm(true)}> <MdAdd /> </Button>
                <Button className="ml-1" size="lg" onClick={() => setShowImportForm(true)}> <BsArrowUpDown /> </Button>
            </div>

            <div className="publicationList">
                {
                    teamPublications.map(pub => 
                        <Publication pub={pub} key={pub._id}/>
                    )
                }
            </div>

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
                    />
                </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button> Confirm </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Publications