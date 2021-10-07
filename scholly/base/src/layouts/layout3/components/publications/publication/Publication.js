/**
 * The Publication component displays a single publication.
 */
import React from 'react';
import { Card } from 'react-bootstrap';

const Publication = ({ pub }) => (
  <div
    as={Card.Header}
    eventKey={pub._id}
    className="row mb-2"
    style={{ width: '70%' }}
  >
    <div className="row">
      <div className="pub-year-below-title col-md-auto">
        {pub.yearPublished}
      </div>
      <div className="col">
        <div className="publication-title row">
          {pub.title}
        </div>
        <div className=" row">
          {
            pub.category.categoryTitle && (
            <div className="publication-category-info" style={{ fontStyle: 'italic' }}>
              {pub.category.categoryTitle}
              {pub.category.categoryTitle && `, ${pub.category.type.charAt(0) + pub.category.type.slice(1).toLowerCase()}`}
              {pub.category.issue && `, Issue ${pub.category.issue}`}
              {pub.category.volume && `, Volume ${pub.category.volume}`}
              {pub.category.pages && `, Page ${pub.category.pages}`}
              {`,  ${pub.yearPublished}`}
            </div>
            )
          }
        </div>
        <div className="row">
          {pub.authors.map((author) => `${author}`).join(', ')}
        </div>
      </div>
    </div>
  </div>
);

export default Publication;
