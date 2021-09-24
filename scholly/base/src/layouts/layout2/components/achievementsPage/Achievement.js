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

    <ListGroup.Item
      style={{
        textAlign: 'left', backgroundColor: isHovering && '#f5f8fa',
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
      <div className="pub-text">
        {achievement.description}
      </div>
    </ListGroup.Item>

  );
};
export default Achievement;
