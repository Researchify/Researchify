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
        fontSize: '15px', textAlign: 'left', marginTop: '15px', marginLeft: '30px', marginRight: '30px', color: isHoveringArrow ? 'var(--researchify-text-color)' : 'var(--researchify-text-color-secondary)',
      }}
      >
        {pub.description}
      </div>
    </Collapse>
  );

  return (
    <ListGroup style={{ marginBottom: '5px', boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)' }}>
      <ListGroup.Item
        style={{
          textAlign: 'left',
          backgroundColor: isHovering ? 'var(--researchify-color-tertiary)' : 'var(--researchify-color-secondary)',
        }}
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
      >
        <div style={{
          fontSize: '16px', fontWeight: 'bold', color: 'var(--researchify-text-color)',
        }}
        >
          {pub.title}
        </div>
        {
          pub.category.categoryTitle && (
          <div style={{ fontSize: '15px', fontStyle: 'italic', color: isHovering ? 'var(--researchify-text-color)' : 'var(--researchify-text-color-secondary)' }}>
            {pub.category.categoryTitle}
            {pub.category.categoryTitle && `, ${pub.category.type.charAt(0) + pub.category.type.slice(1).toLowerCase()}`}
            {pub.category.issue && `, Issue ${pub.category.issue}`}
            {pub.category.volume && `, Volume ${pub.category.volume}`}
            {pub.category.pages && `, Page ${pub.category.pages}`}
            {`,  ${pub.yearPublished}`}
          </div>
          )
        }
        <div style={{ fontSize: '15px', color: isHovering ? 'var(--researchify-text-color)' : 'var(--researchify-text-color-secondary)' }}>{pub.authors.map((author) => `${author}`).join(', ')}</div>
        {
          pub.category.publisher && (
          <div style={{ fontSize: '15px', color: isHovering ? 'var(--researchify-text-color)' : 'var(--researchify-text-color-secondary)' }}>
            Published by
            {' '}
            {pub.category.publisher}
          </div>
          )
        }
        {
          pub.link && (
            <div>
              <a style={{ fontSize: '15px' }} href={pub.link} target="_blank" rel="noreferrer">PDF</a>
            </div>
          )
        }
      </ListGroup.Item>

      {pub.description
      && (
      <ListGroup.Item
        style={{ backgroundColor: isHoveringArrow ? 'var(--researchify-color-tertiary)' : 'var(--researchify-color-secondary)', cursor: isHoveringArrow && 'pointer' }}
        onMouseOver={() => setIsHoveringArrow(true)}
        onFocus={() => setIsHoveringArrow(true)}
        onMouseLeave={() => setIsHoveringArrow(false)}
        onBlur={() => setIsHoveringArrow(false)}
        onClick={() => setExpand(!expand)}
      >
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--researchify-text-color)' }}>
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
