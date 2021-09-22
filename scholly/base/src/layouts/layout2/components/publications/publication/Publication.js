/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * The Publication component displays a single publication.
 */
import React, { useState } from 'react';
import { Collapse, ListGroup } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Publication = ({ pub }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringArrow, setIsHoveringArrow] = useState(false);
  const [expand, setExpand] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const dropDown = (
    <Collapse in={expand}>
      <div style={{
        textAlign: 'left', marginTop: '15px', marginLeft: '30px', marginRight: '30px', color: 'grey',
      }}
      >
        {pub.description}
      </div>
    </Collapse>
  );

  return (
    <ListGroup style={{ marginBottom: '10px' }}>
      <ListGroup.Item
        style={{
          textAlign: 'left', backgroundColor: isHovering && '#F5F5F5',
        }}
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
      >
        <div><b>{pub.title}</b></div>
        <div className="pub-text">{pub.authors.map((author) => `${author}`).join(', ')}</div>
        {
          pub.category.categoryTitle && (
          <div className="pub-text">
            <i>{pub.category.categoryTitle}</i>
              {pub.category.categoryTitle && `, ${pub.category.type.charAt(0) + pub.category.type.slice(1).toLowerCase()}`}
              {pub.category.issue && `, Issue ${pub.category.issue}`}
              {pub.category.volume && `, Volume ${pub.category.volume}`}
              {pub.category.pages && `, Page ${pub.category.pages}`}
              {`,  ${pub.yearPublished}`}
          </div>
          )
        }
        {
          pub.category.publisher && (
          <div className="pub-text">
            Published by
            {' '}
            {pub.category.publisher}
          </div>
          )
        }
        {
          pub.link && (
            <div className="pub-text">
              <a href={pub.link} target="_blank" rel="noreferrer">PDF</a>
            </div>
          )
        }
      </ListGroup.Item>

      {pub.description
      && (
      <ListGroup.Item
        style={{ backgroundColor: isHoveringArrow && '#F5F5F5', cursor: isHoveringArrow && 'pointer' }}
        onMouseOver={() => setIsHoveringArrow(true)}
        onFocus={() => setIsHoveringArrow(true)}
        onMouseLeave={() => setIsHoveringArrow(false)}
        onBlur={() => setIsHoveringArrow(false)}
        onClick={() => setExpand(!expand)}
      >
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left' }}>Description</div>
            <div style={{ textAlign: 'right' }}>
              {expand ? <IoIosArrowUp /> : <IoIosArrowDown />}
              {' '}
            </div>
          </div>
          {dropDown}
        </>
      </ListGroup.Item>
      )}

    </ListGroup>

  );
};
export default Publication;
