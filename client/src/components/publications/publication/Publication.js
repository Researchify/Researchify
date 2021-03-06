/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * The Publication component displays a single publication details
 */

import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Row,
  Col,
  Collapse,
} from 'react-bootstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { BsLink45Deg } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import PublicationForm from '../form/PublicationForm';
import { deletePublication } from '../../../actions/publications';
import { CHECK_PUBLICATIONS, UNCHECK_PUBLICATIONS } from '../../../actions/types';
import '../publications.css';
import {
  SecondaryButton, DangerButton, StyledButtonGroup, ButtonGroupItem,
} from '../../shared/styledComponents';
import { PublicationsEditDeleteWalkthrough } from '../publicationsOnboarding';

const Publication = ({ pub }) => {
  const dispatch = useDispatch();
  const [newlyAdded, setNewlyAdded] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [expand, setExpand] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { checkedPublications } = useSelector((state) => state.publications);

  useEffect(() => {
    if (pub.isNewlyAdded) {
      delete pub.isNewlyAdded;
      setInterval(() => {
        setNewlyAdded(false);
      }, 2500);
      setNewlyAdded(true);
    }
  }, [pub]);

  const handleDelete = () => {
    dispatch(deletePublication(pub._id));
    setShowDeleteMessage(false);
  };

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

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleCheck = () => {
    if (checkedPublications.includes(pub._id)) {
      dispatch({
        type: UNCHECK_PUBLICATIONS,
        payload: [pub._id],
      });
    } else {
      dispatch({
        type: CHECK_PUBLICATIONS,
        payload: [pub._id],
      });
    }
  };

  // prevent clicking on inner div calling the outer div onclick function
  const childCallback = (event) => {
    event.stopPropagation();
    return false;
  };

  return (
    <div
      id="publication-card"
      className="publication-container mb-2"
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
    >
      <div
        className={newlyAdded ? 'newlyAddedPublicationHeader' : 'publicationHeader'}
        onClick={handleCheck}
      >
        <Row>
          <Col md={10}>
            <div style={{ display: 'flex' }}>
              <div style={{ paddingTop: '10px', paddingLeft: '10px' }}>
                <input id="publication-checkbox" type="checkbox" checked={checkedPublications.includes(pub._id) || false} />
              </div>
              <div className="pubs-title">
                {pub.link ? (
                  <a style={{ color: 'white' }} href={pub.link} target="_blank" rel="noreferrer">
                    <BsLink45Deg />
                    {' '}
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </div>
              <div style={{ paddingLeft: '10px' }}>
                <PublicationsEditDeleteWalkthrough />
              </div>
            </div>
          </Col>
          <Col md={2}>
            {
              isHovering
            && (
            <StyledButtonGroup onClick={childCallback} className="float-right">
              <ButtonGroupItem color="#56658a" onClick={() => setShowUpdateForm(true)}><RiEdit2Line /></ButtonGroupItem>
              <ButtonGroupItem color="#dc3545" hoverBorderColor="#dc3545" hoverColor="white" onClick={() => setShowDeleteMessage(true)}>
                <RiDeleteBin6Line />
              </ButtonGroupItem>
            </StyledButtonGroup>
            )
            }
          </Col>
        </Row>
      </div>

      <div className="pub" style={{ backgroundColor: isHovering && '#f5f2f2' }} onClick={() => setExpand(!expand)}>
        <div className="pubs-props">
          <b> Authors: </b>
          {pub.authors.map((author) => `${author}`).join(', ')}
        </div>
        <div className={expand ? 'pubs-props' : 'blur pubs-props'}>
          {' '}
          <b>Year Published: </b>
          {pub.yearPublished}
          {' '}
        </div>
      </div>

      {dropDown}

      {/* A modal for showing update publication from */}
      <Modal show={showUpdateForm}>
        <Modal.Header>
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
        <Modal.Header>
          <Modal.Title> Delete Publication </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this publication?
        </Modal.Body>
        <Modal.Footer>
          <SecondaryButton onClick={() => setShowDeleteMessage(false)}>
            {' '}
            Cancel
            {' '}
          </SecondaryButton>
          <DangerButton onClick={handleDelete}>
            {' '}
            Confirm
            {' '}
          </DangerButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// props validation
Publication.propTypes = {
  pub: PropTypes.object.isRequired,
};

export default Publication;
