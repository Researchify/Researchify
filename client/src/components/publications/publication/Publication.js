/**
 * The Publication component displays a single publication details
 */

import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  OverlayTrigger,
  ButtonGroup,
  Row,
  Col,
  Collapse,
} from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import PublicationForm from '../form/PublicationForm';
import { deletePublication } from '../../../actions/publications';
import '../publications.css';

const Publication = ({ pub }) => {
  const dispatch = useDispatch();
  const [newlyAdded, setNewlyAdded] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (pub.newlyAdded) {
      delete pub.newlyAdded;
      setInterval(() => {
        setNewlyAdded(false);
      }, 2500);
      setNewlyAdded(true);
    }
  }, [pub.newlyAdded, pub._id]);

  const handleDelete = () => {
    dispatch(deletePublication(pub._id));
    setShowDeleteMessage(false);
  };

  // Parameters are to remove warning when button is clicked.
  // See PR#160 for more information.
  const displayOptions = ({
    placement,
    scheduleUpdate,
    arrowProps,
    outOfBoundaries,
    show,
    ...props
  }) => (
    <ButtonGroup {...props}>
      <Button
        onClick={() => setShowUpdateForm(true)}
        variant="primary"
        data-toggle="modal"
      >
        {' '}
        <AiFillEdit />
        {' '}
      </Button>
      <Button
        onClick={() => setShowDeleteMessage(true)}
        variant="danger"
        data-toggle="modal"
      >
        <AiFillDelete />
      </Button>
    </ButtonGroup>
  );

  const dropDown = (
    <Collapse in={expand}>
      <div className="pub" onClick={() => setExpand(!expand)}>
        <div className="pubs-props">
          {' '}
          <b>Description:</b>
          {' '}
          {pub.description}
          {' '}
        </div>
        <div className="pubs-props">
          <b>
            {pub.category.type.charAt(0)
              + pub.category.type.slice(1).toLowerCase()}
            :
          </b>
          {' '}
          {pub.category.categoryTitle}
          {' '}
        </div>
        {pub.category.issue && (
          <div className="pubs-props">
            {' '}
            <b>Issue:</b>
            {' '}
            {pub.category.issue}
            {' '}
          </div>
        )}
        {pub.category.volume && (
          <div className="pubs-props">
            {' '}
            <b>Volume:</b>
            {' '}
            {pub.category.volume}
            {' '}
          </div>
        )}
        {pub.category.pages && (
          <div className="pubs-props">
            {' '}
            <b>Pages:</b>
            {' '}
            {pub.category.pages}
            {' '}
          </div>
        )}
        {pub.category.publisher && (
          <div className="pubs-props">
            {' '}
            <b>Publisher:</b>
            {' '}
            {pub.category.publisher}
            {' '}
          </div>
        )}
      </div>
    </Collapse>
  );

  return (
    <div className="publication-container">
      <div
        className={newlyAdded ? 'newlyAddedPublicationHeader' : 'modalHeader'}
      >
        <Row>
          <Col md={11}>
            <div className="pubs-title">
              {pub.link ? (
                <a href={pub.link} target="_blank" rel="noreferrer">
                  {pub.title}
                </a>
              ) : (
                pub.title
              )}
            </div>
          </Col>
          <Col md={1}>
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="bottom"
              overlay={displayOptions}
            >
              <Button className="mt-1 mb-1" variant="default">
                <IconContext.Provider value={{ color: 'black' }}>
                  <BsThreeDotsVertical />
                </IconContext.Provider>
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </div>

      <div className="pub" onClick={() => setExpand(!expand)}>
        <div className="pubs-props">
          <b> Authors: </b>
          {pub.authors.map((author) => `${author}`).join(', ')}
        </div>
        <Row>
          <Col md={11}>
            <div className={expand ? 'pubs-props' : 'blur pubs-props'}>
              {' '}
              <b>Year Published: </b>
              {pub.yearPublished}
              {' '}
            </div>
          </Col>
        </Row>
      </div>

      {dropDown}

      {/* A modal for showing update publication from */}
      <Modal show={showUpdateForm}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Edit Publication </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PublicationForm
            type="update"
            pub={pub}
            closeModal={() => setShowUpdateForm(false)}
          />
        </Modal.Body>
      </Modal>

      {/* A modal for showing confirm delete message */}
      <Modal show={showDeleteMessage}>
        <Modal.Header className="modalHeader">
          <Modal.Title> Delete Publication </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this publication?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowDeleteMessage(false)}>
            {' '}
            Cancel
            {' '}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {' '}
            Confirm
            {' '}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Publication;
