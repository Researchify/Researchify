/**
 * The Publication component displays a single publication.
 */
import React, { useState } from 'react';
import {
  Accordion, Card, Button, Collapse,
} from 'react-bootstrap';

const Publication = ({ pub }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="team-card m-5 border-0 shadow ">
      <Card.Header className="publication-title-column">
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
      </Card.Header>
      <div className="publication-card-buttons publication-title-column">
        <Accordion.Toggle
          eventKey={pub._id}
          className="publication-title-column"
        >
          <Button variant="dark" onClick={() => setExpanded(!expanded)}>
            Read
            {expanded ? ' Less' : ' More'}
          </Button>
          {' '}
        </Accordion.Toggle>
        <Button variant="dark"> Go to Publication </Button>
      </div>

      <Collapse in={expanded} eventKey={pub._id}>
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
        </Card.Body>
      </Collapse>
    </Card>

  );
};

export default Publication;
