/**
 * This component display a single award as a card component.
 */

import React from 'react';
import {Card} from 'react-bootstrap';
import profilePicture from '../../images/awardpic.jpg';

let bg_theme = 'bg-secondary';
const Awards = ({award}) => {

  bg_theme = bg_theme == 'bg-secondary' ? 'bg-light' : 'bg-secondary';

  return (

    <div className="row mb-2" style={{width:'70%'}}>
      <Card className={`w-100 d-flex h-100 flex-column justify-content-center flex-wrap p-3 ${bg_theme}`}>
        <div className="row g-0" >
          <div className="col-md-4 h-100" >
            <Card.Img variant="top" src={profilePicture} style={{ height: '150px',width:'150px',borderRadius:'100%' }} />
          </div>
          <div className="col-md-8" >
            <Card.Body>
              <div className="award-name d-block w-100 text-right">{award.fullName}</div>
              <div className="award-position d-block w-100 text-right">{award.position}</div>
              <div className="award-summary d-block w-100 text-right">{award.summary}</div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Awards;