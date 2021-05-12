import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPublicationsByTeamId } from '../../actions/publications'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PublicationForm from './PublicationForm'
import { BsFillPersonFill, BsArrowUpDown } from 'react-icons/bs'
import { VscAdd } from 'react-icons/vsc'
import { IconContext } from "react-icons"
import Publication from './publication/Publication'
import './publications.css'
import { cloneDeep } from 'lodash';


const Publications = () => {
    const dispatch = useDispatch();
    const { teamId } = useParams();


    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [dispatch, teamId]);

    const teamPublications = useSelector(state => state.publications);

    // clone the teamPublications and pass as props
    return <><PublicationsListView teamPublications={cloneDeep(teamPublications)} /></>

}

const PublicationsListView = ({teamPublications}) => {
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showImportForm, setShowImportForm] = useState(false)
    const [sortOption, setSortOption] = useState("year")
    console.log(teamPublications)
    const publicationsList = teamPublications;  // assign as normal as the teamPublications has been cloned

    console.log(teamPublications == publicationsList)  // sanity reference equality check (objects are passed by ref)

    const sortYear = () => {
        // sort by title then year for consistency with the db
        sortTitle();
        publicationsList.sort((a, b) => (a.year > b.year) ? -1 : 1);
    }

    const sortAuthor = () => {
        // sort by the first author in the author array
        publicationsList.sort((a, b) => (a.authors[0] > b.authors[0]) ? 1 : -1);
    }

    const sortTitle = () => {
        publicationsList.sort((a, b) => (a.title > b.title) ? 1 : -1);  // when publicationsList gets mutated, so too will the teamPublications prop
        console.log('sorted by title: ', publicationsList);
    }

    const sortPublicationType = () => {
        // assuming journal and conference fields are going to be there but blank if not either
        // teamPublications.sort((a, b) => ())

    }

    const handleSortingOption = (sortingOption) => {

        switch (sortingOption) {
            case "author":
                sortAuthor();
                setSortOption("author");
                break;
            case "title":
                sortTitle();
                setSortOption("title");  // trigger re-render
                break;
            case "type":
                sortPublicationType();
                setSortOption("type");
                break;
            default:
                sortYear();
                setSortOption("year");
                break;
        }

        // console.log(publicationsList);

    }

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
                <select className="form-select form-select-sm" onChange={e => handleSortingOption(e.target.value)}>
                    <option defaultValue>Year</option>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                    <option value="type">Publication Type</option>
                </select>

            </div>
            <div className="publicationList">
                {
                    publicationsList.map(pub =>
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