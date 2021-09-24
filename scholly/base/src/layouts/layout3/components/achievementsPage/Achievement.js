/**
 * This component display a single award as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import awardPicture from '../../../../shared/images/awardpic.jpg';

let bgTheme = 'bg-secondary';
const Achievement = ({ achievement }) => {
  bgTheme = (bgTheme === 'bg-secondary') ? 'bg-light' : 'bg-secondary';

  return (

    <div className="row mb-2" style={{ width: '70%' }}>
      <div className="row g-0">
        <div className="col-md-auto h-100">
          <Card.Img variant="top" src={awardPicture} style={{ height: '100px', width: '100px' }} />
        </div>
        <div className="col achievementBody">
          <div className="award-name d-block w-100 text-left">{achievement.title}</div>
          <div className="award-year d-block w-100 text-left">{achievement.yearAwarded}</div>
          <div className="award-summary d-block w-100 text-left">{achievement.description}</div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;
