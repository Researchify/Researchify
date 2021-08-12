/**
 * The Publication component displays a single publication.
 */
import React, { Fragment, useState } from 'react';
import { Button, Col, Row, Collapse, Accordion, Card } from 'react-bootstrap';
import { BsLink45Deg } from 'react-icons/bs';
import { GrLinkDown, GrLinkUp } from 'react-icons/gr';
import { IconContext } from 'react-icons';

const Publication = ({ pub }) => {
  return (
    <Card className="publication-class">
      <Accordion.Toggle
        as={Card.Header}
        eventKey={pub._id}
        className="publication-title-column"
      >
        <div className="pub-category-above-title">{pub.category.type}</div>
        <div className="publication-title"> {pub.title}</div>
        <div className="pub-year-below-title"> {pub.yearPublished} </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={pub._id}>
        <Card.Body className="publication-body-column">
          <div className="pub-body-subheader">Authors</div>
          <div className="pub-body-content">{pub.authors.map((author) => `${author}`).join(', ')}</div>

          <div className="pub-body-subheader">Description</div>
          <div className="pub-body-content pub-body-paragraph"> {pub.description}</div>
          
          <h5>
            <b>
              {pub.category.type.charAt(0) +
                pub.category.type.slice(1).toLowerCase()}
              :
            </b>{' '}
            {pub.category.categoryTitle}
          </h5>
          {pub.category.issue && (
            <h5>
              {' '}
              <b>Issue:</b> {pub.category.issue}{' '}
            </h5>
          )}
          {pub.category.volume && (
            <h5>
              {' '}
              <b>Volume:</b> {pub.category.volume}{' '}
            </h5>
          )}
          {pub.category.pages && (
            <h5>
              <b>Pages:</b> {pub.category.pages}{' '}
            </h5>
          )}
          {pub.category.publisher && (
            <h5>
              {' '}
              <b>Publisher:</b> {pub.category.publisher}{' '}
            </h5>
          )}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Publication;
