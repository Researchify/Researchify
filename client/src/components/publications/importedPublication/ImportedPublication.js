/**
 * The ImportedPublication component displays an individual imported publication when the import is success
 */

import { Collapse, ListGroup } from 'react-bootstrap';
import './importedPublication.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

const ImportedPublication = ({ pub, index, setChecked }) => {
  const [expand, setExpand] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { publicationsToImport } = useSelector(
    (state) => state.importedPublications,
  );
  const { publications } = useSelector((state) => state.importedPublications);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const dropDown = (
    <Collapse in={expand}>
      <div className="ml-4">
        <span>
          <b>
            {pub.category.type.charAt(0)
            + pub.category.type.slice(1).toLowerCase()}
          </b>
          :
          {` ${pub.category.categoryTitle}`}
          <br />
        </span>
        {pub.category.issue && (
        <span>
          <b>Issue:</b>
          {` ${pub.category.issue}`}
          <br />
        </span>
        )}
        {pub.category.volume && (
        <span>
          Volume:
          {` ${pub.category.volume}`}
          <br />
        </span>
        )}
        {pub.category.pages && (
        <span>
          Pages:
          {` ${pub.category.pages}`}
          <br />
        </span>
        )}
        {pub.category.publisher && (
          <span>
            <b>Publisher:</b>
            {` ${pub.category.publisher}`}
            <br />
          </span>
        )}
        <span>
          <b>Description:</b>
          {` ${pub.description}`}
        </span>
      </div>
    </Collapse>
  );

  const handleCheck = () => {
    setChecked(index);
    setExpand(expand);
  };

  return (
    <>
      <ListGroup.Item
        style={{ background: isHovering && '#f6f9fa', cursor: isHovering && 'pointer', fontSize: '16px' }}
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
        onClick={() => setExpand(!expand)}
      >
        <div style={{ display: 'flex' }}>
          <div>
            <input type="checkbox" checked={publicationsToImport[publications.indexOf(pub)]} onChange={handleCheck} />
          </div>
          <div style={{ marginLeft: '10px', fontSize: '16', fontWeight: '500' }}>
            {pub.link ? (
              <a href={pub.link} target="_blank" rel="noreferrer">
                {pub.title}
              </a>
            ) : (
              pub.title
            )}
          </div>
        </div>
        <h6 className="ml-4 m-1 text-muted">
          {pub.authors.map((author) => `${author}`).join(', ')}
        </h6>
        <h6 className="ml-4 ">
          {' '}
          Year Published:
          {` ${pub.yearPublished}`}
        </h6>
        {dropDown}
      </ListGroup.Item>
    </>
  );
};

// props validation
ImportedPublication.propTypes = {
  pub: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default ImportedPublication;
