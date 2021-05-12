import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPublicationsByTeamId } from '../../actions/publications'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PublicationForm from './form/PublicationForm'
import { BsFillPersonFill, BsArrowUpDown } from 'react-icons/bs'
import { VscAdd } from 'react-icons/vsc'
import { IconContext } from "react-icons"
import Publication from './publication/Publication'
import './publications.css'
import CategoryForm from './form/CategoryForm';


const Publications = () => {
    const dispatch = useDispatch();
    const { teamId } = useParams();
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showImportForm, setShowImportForm] = useState(false)

    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [dispatch, teamId]);

    const teamPublications = useSelector(state => state.publications)
    const teamJournalPublications = teamPublications.filter(pub => pub.category.type === "JOURNAL")
    const teamConferencePublications = teamPublications.filter(pub => pub.category.type === "CONFERENCE")

    return (
        <> 
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

            <div className="text-center">
                <h4>
                    Total of {teamPublications.length} publications
                </h4>
            </div>

            <h2 className="publicationListHeader"> Journal </h2>
            <div className="publicationList">
            {
                teamJournalPublications.map(pub => 
                    <Publication pub={pub} key={pub._id}/>)
            }
            </div>

            <h2 className="publicationListHeader"> Conference </h2>
            <div className="publicationList">
            {
                teamConferencePublications.map(pub => 
                    <Publication pub={pub} key={pub._id}/>)
            }
            </div>

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