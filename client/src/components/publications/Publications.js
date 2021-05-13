import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPublicationsByTeamId, sortPublications } from '../../actions/publications'
import { Button, Modal, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import PublicationForm from './PublicationForm'
import { BsFillPersonFill, BsArrowUpDown } from 'react-icons/bs'
import { VscAdd } from 'react-icons/vsc'
import { IconContext } from "react-icons"
import Publication from './publication/Publication'
import './publications.css'


const Publications = () => {
    const dispatch = useDispatch();
    const { teamId } = useParams();
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showImportForm, setShowImportForm] = useState(false)
    const [sortingOption, setSortingOption] = useState("year");

    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [dispatch, teamId]);

    const teamPublications = useSelector(state => state.publications)

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
                <DropdownButton id="dropdown-item-button" title={"Sort by: "+sortingOption} >
                    <Dropdown.Item as="button" value="year" onClick={e => {dispatch(sortPublications(teamPublications, e.target.value)); setSortingOption(e.target.value)}}>Year</Dropdown.Item>
                    <Dropdown.Item as="button" value="author" onClick={e => {dispatch(sortPublications(teamPublications, e.target.value)); setSortingOption(e.target.value)}}>Author</Dropdown.Item>
                    <Dropdown.Item as="button" value="title" onClick={e => {dispatch(sortPublications(teamPublications, e.target.value)); setSortingOption(e.target.value)}}>Title</Dropdown.Item>
                    <Dropdown.Item as="button" value="type" onClick={e => {dispatch(sortPublications(teamPublications, e.target.value)); setSortingOption(e.target.value)}}>Publication Type</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="publicationList">
            {
                teamPublications.map(pub => 
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