import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { getPublicationById } from '../../../actions/publications'
import Header from '../../layout/Header'
import PublicationForm from '../PublicationForm'
import { Button, Modal } from 'react-bootstrap';

const Publication = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pubId } = useParams();
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)

    useEffect(() => {
        dispatch(getPublicationById(pubId));
      }, [pubId, dispatch]);
    
    const pub = useSelector(state => state.publications.currentPublication)
    console.log(pub)
    const handleDelete = () => {
        history.push("/publications/team/606bb59c22201f529db920c9")
    }
    
    return (
        <div>
            <Header />
            <h1> Individual Publication Page </h1>
            <h3> Title: {pub?.title} </h3>
            <h3> Description: {pub?.description} </h3>
            <h3> Authors: {pub?.authors.join(", ")} </h3>
            <h3> Created at: {pub?.createdAt} </h3>
            <h3> Updated at: {pub?.updatedAt} </h3>
            <h3> Year Published: {pub?.yearPublished} </h3>
            <h3> Team Id: {pub?.teamId} </h3>

            <Button onClick={() => setShowUpdateForm(true)} variant="primary" data-toggle="modal"> Edit Publication </Button>
            <Button onClick={() => setShowDeleteMessage(true)} variant="outline-danger" data-toggle="modal"> Delete Publication </Button>

            <Modal show={showUpdateForm} onHide={() => setShowUpdateForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Publication
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PublicationForm type="update" pub={pub} closeModal={() => setShowUpdateForm(false)}/>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteMessage} onHide={() => setShowDeleteMessage(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Delete Publication
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this publication? 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteMessage(false)}> Cancel </Button>
                    <Button variant="primary" onClick={handleDelete}> Yes </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Publication