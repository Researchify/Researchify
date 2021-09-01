/**
 * The Publication component displays a single publication.
 */
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const Publication = ({ pub }) => (
  <Card className="publication-card">
    <Accordion.Toggle
      as={Card.Header}
      eventKey={pub._id}
      className="publication-title-column"
    >
      <div className="pub-category-above-title">{pub.category.type}</div>
      <div className="publication-title">
        {' '}
        {pub.title}
      </div>
      <div className="pub-year-below-title">
        {' '}
        {pub.yearPublished}
        {' '}
      </div>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={pub._id}>
      <Card.Body className="publication-body-column">
        <div className="pub-body-subheader">Authors</div>
        <div className="pub-body-content">
          {pub.authors.map((author) => `${author}`).join(', ')}
        </div>
        <div className="pub-body-subheader">Description</div>
        <div className="pub-body-content pub-body-paragraph">
          {pub.description}
        </div>
        <div className="pub-body-subheader">
          {pub.category.categoryTitle
            ? pub.category.type.charAt(0)
                + pub.category.type.slice(1).toLowerCase()
            : ''}
        </div>
        <div className="pub-body-content">
          {pub.category.categoryTitle
            ? pub.category.categoryTitle
                + (pub.category.issue ? `, Issue ${pub.category.issue}` : '')
                + (pub.category.volume ? `, Volume ${pub.category.volume}` : '')
                + (pub.category.pages ? `, Page ${pub.category.pages}` : '')
            : ''}
        </div>
        <div className="pub-body-subheader">
          {pub.category.publisher ? 'Published by' : null}
        </div>
        <div className="pub-body-content">{pub.category.publisher}</div>
        <div className="pub-body-subheader">
          {pub.link ? 'View at' : null}
        </div>
        <div className="pub-body-content"><a href={pub.link}>{pub.link}</a></div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default Publication;
