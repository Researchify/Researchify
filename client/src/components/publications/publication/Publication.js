/**
 * The Publication component displays a single publication details
 */

import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  // OverlayTrigger,
  //  ButtonGroup,
  Row,
  Col,
  Collapse,
} from 'react-bootstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import PublicationForm from '../form/PublicationForm';
import { deletePublication } from '../../../actions/publications';
import '../publications.css';
import { StyledButtonGroup, ButtonGroupItem } from '../publicationsLayout/PublicationsDropdown';

const Publication = ({ pub }) => {
  const dispatch = useDispatch();
  const [newlyAdded, setNewlyAdded] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [expand, setExpand] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

  console.log(isHovering);

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

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="publication-container" onMouseOver={handleMouseOver} onFocus={handleMouseOver} onMouseOut={handleMouseOut} onBlur={handleMouseOut}>
      <div
        className={newlyAdded ? 'newlyAddedPublicationHeader' : 'modalHeader'}
      >
        <Row>
          <Col md={11}>
            <div style={{ display: 'flex' }}>
              <div style={{ paddingTop: '13px', paddingLeft: '13px' }}>
                <input type="checkbox" />
              </div>
              <div className="pubs-title">
                {pub.link ? (
                  <a href={pub.link} target="_blank" rel="noreferrer">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </div>
            </div>
          </Col>
          <Col md={1}>
            <StyledButtonGroup>
              <ButtonGroupItem onClick={() => setShowUpdateForm(true)}><RiEdit2Line /></ButtonGroupItem>
              <ButtonGroupItem onClick={() => setShowDeleteMessage(true)}><RiDeleteBin6Line /></ButtonGroupItem>
            </StyledButtonGroup>

          </Col>
        </Row>
      </div>

      <div className="pub" onClick={() => setExpand(!expand)}>
        <div className="pubs-props">
          <b> Authors: </b>
          {pub.authors.map((author) => `${author}`).join(', ')}
        </div>
        <div className="pubs-props">
          {' '}
          <b>Year Published: </b>
          {pub.yearPublished}
          {' '}
        </div>
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
