/**
 * This component display a single award as a card component.
 */

import React from 'react';
import { Card } from 'react-bootstrap';
import profilePicture from '../../../../shared/images/awardpic.jpg';

let bgTheme = 'bg-secondary';
const Achievement = ({ achievement }) => {
  bgTheme = (bgTheme === 'bg-secondary') ? 'bg-light' : 'bg-secondary';

  return (

    <div className="row mb-2" style={{ width: '70%' }}>
      <Card className={`w-100 d-flex h-100 flex-column justify-content-center flex-wrap p-3 ${bgTheme}`}>
        <div className="row g-0">
          <div className="col-md-4 h-100">
            <Card.Img variant="top" src={profilePicture} style={{ height: '150px', width: '150px', borderRadius: '100%' }} />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <div className="award-name d-block w-100 text-right">{achievement.title}</div>
              <div className="award-position d-block w-100 text-right">{achievement.yearAwarded}</div>
              <div className="award-summary d-block w-100 text-right">{achievement.description}</div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Achievement;
