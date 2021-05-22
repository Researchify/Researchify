/**
 * Displays a modal component form to collect user's GitHub username and their PAT, and dispatches an action
 * to deploy their site.
 */
import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import {useSelector, useDispatch} from "react-redux";

import {publishToGitHubPages} from "../../actions/publish";


const PublishToast = () => {
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'relative',
                minHeight: '100px',
            }}
        >
            <Toast
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                }}
            >
                <Toast.Header>
                    <strong className="mr-auto">Bootstrap</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>We are publishing your site. Please be patient.</Toast.Body>
            </Toast>
        </div>
    )
};


const PublishSiteModal = () => {
    const teamId = useSelector(state => state.team.teamId);
    const dispatch = useDispatch();

    const [showModalForm, setShowModalForm] = useState(false);
    const [ghUsername, setGhUsername] = useState('');
    const [ghToken, setGhToken] = useState('');
    const [showPublishToast, setShowPublishToast] = useState(false);

    const handleModalClose = () => setShowModalForm(false);
    const handleModalShow = () => setShowModalForm(true);

    const handlePublish = (event) => {
        event.preventDefault()
        dispatch(publishToGitHubPages(teamId, ghUsername, ghToken));
        setShowModalForm(false);
        setShowPublishToast(true);
    };


    return (
        <>
            <Button onClick={handleModalShow}>Publish Site!</Button>
            <Modal show={showModalForm} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Deploy Website with GitHub Pages</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>GitHub Username</Form.Label>
                            <Form.Control placeholder="Enter GitHub Username"
                                          onChange={e => setGhUsername(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>GitHub Token</Form.Label>
                            <Form.Control type="password" placeholder="Paste GitHub Token"
                                          onChange={e => setGhToken(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I agree to the terms and conditions."/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                        <Button type="submit" variant="primary" onClick={e => handlePublish(e)}>Publish</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {
                showPublishToast && <PublishToast/>
            }
        </>
    );
};

export default PublishSiteModal;
