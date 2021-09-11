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
import { GrLinkDown, GrLinkUp } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import { PropTypes } from 'prop-types';
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

  const displayUpArrow = () => (
    expand && (
    <IconContext.Provider value={{ color: 'black', size: '25px' }}>
      <GrLinkUp className="ml-3" />
    </IconContext.Provider>
    )
  );

  const displayDownArrow = () => (
    !expand && (
    <IconContext.Provider value={{ color: 'black', size: '25px' }}>
      <GrLinkDown onClick={() => setExpand(!expand)} className="ml-2" />
    </IconContext.Provider>
    )
  );

  const dropDown = (
    <Collapse in={expand}>
      <div className="mb-3 ml-3 mr-2">
        <h5>
          {' '}
          <b>Description:</b>
          {' '}
          {pub.description}
          {' '}
        </h5>
        <h5>
          {' '}
          <b>
            {pub.category.type.charAt(0)
              + pub.category.type.slice(1).toLowerCase()}
            :
          </b>
          {' '}
          {pub.category.categoryTitle}
          {' '}
        </h5>
        {pub.category.issue && (
          <h5>
            {' '}
            <b>Issue:</b>
            {' '}
            {pub.category.issue}
            {' '}
          </h5>
        )}
        {pub.category.volume && (
          <h5>
            {' '}
            <b>Volume:</b>
            {' '}
            {pub.category.volume}
            {' '}
          </h5>
        )}
        {pub.category.pages && (
          <h5>
            {' '}
            <b>Pages:</b>
            {' '}
            {pub.category.pages}
            {' '}
          </h5>
        )}
        {pub.category.publisher && (
          <h5>
            {' '}
            <b>Publisher:</b>
            {' '}
            {pub.category.publisher}
            {' '}
          </h5>
        )}
        <Row>
          <Col md={{ span: 1, offset: 11 }}>
            <span
              onClick={() => setExpand(!expand)}
              onKeyPress={() => setExpand(!expand)} // usability, see WCAG 2.1.1
            >
              {displayUpArrow()}

            </span>
          </Col>
        </Row>
      </div>
    </Collapse>
  );

  return (
    <>
      <div
        className={newlyAdded ? 'newlyAddedPublicationHeader' : 'modalHeader'}
      >
        <Row>
          <Col md={11}>
            <h3 className="ml-3 mt-3">
              {pub.link ? (
                <a href={pub.link} target="_blank" rel="noreferrer">
                  {pub.title}
                </a>
              ) : (
                pub.title
              )}
            </h3>
          </Col>
          <Col md={1}>
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="bottom"
              overlay={displayOptions}
            >
              <Button className="mt-3 mb-3" variant="default">
                <IconContext.Provider value={{ color: 'black', size: '20px' }}>
                  <BsThreeDotsVertical />
                </IconContext.Provider>
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </div>

      <div className={expand ? 'ml-3 mt-3' : 'ml-3 mt-3 mb-2'}>
        <h5>
          <b> Authors: </b>
          {pub.authors.map((author) => `${author}`).join(', ')}
        </h5>
        <Row>
          <Col md={11}>
            <h5 className={expand ? '' : 'blur'}>
              {' '}
              <b>Year Published: </b>
              {pub.yearPublished}
              {' '}
            </h5>
          </Col>
          <Col md={1}>{displayDownArrow()}</Col>
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
    </>
  );
};

Publication.propTypes = {
  pub: PropTypes.object.isRequired,
};

export default Publication;
