/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * The Publication component displays a single publication.
 */
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const Achievement = ({ achievement }) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <ListGroup style={{ marginBottom: '5px', width: '100%', boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)' }}>
      <ListGroup.Item
        style={{
          textAlign: 'left',
          backgroundColor: isHovering ? 'var(--researchify-color-tertiary)' : 'var(--researchify-color-secondary)',
          color: 'var(--researchify-text-color)',
        }}
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
      >
        <row>
          <b>{achievement.title}</b>
          <i className="float-right">{achievement.yearAwarded}</i>
        </row>
        <div style={{ fontSize: '14px', marginRight: '20px', color: isHovering ? 'var(--researchify-text-color)' : 'var(--researchify-text-color-secondary)' }}>
          {achievement.description}
        </div>
      </ListGroup.Item>
    </ListGroup>

  );
};
export default Achievement;
