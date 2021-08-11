/**
 * The Publication component displays a single publication.
 */
import React, { Fragment, useState } from 'react';
import { Button, Col, Row, Collapse, Accordion, Card } from 'react-bootstrap';
import { BsLink45Deg } from 'react-icons/bs';
import { GrLinkDown, GrLinkUp } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import '../publications.css';

const Publication = ({ pub }) => {

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={pub._id}>
        {pub.title}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={pub._id}>
        <Card.Body>
          {pub.authors.map((author) => `${author}`).join(', ')}
          {
            <h5>
              <b>Year Published: </b>
              {pub.yearPublished}{' '}
            </h5>
          }
          <h5>
            <b>Description:</b> {pub.description}
          </h5>
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
