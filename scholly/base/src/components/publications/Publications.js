/**
 * The Publications component displays a list of publications.
 */
import React, { Fragment } from 'react';
import { Accordion, Container, Card } from 'react-bootstrap';
import Publication from './publication/Publication';
import './publications.css';
import { TEAM_PUBLICATIONS } from '../../global/data';

const Publications = () => {
  const teamPublications = TEAM_PUBLICATIONS;

  return (
    <Fragment>
      <Container className="pages-top-padding text-center mt-3 mb-3">
        <div className="publication-title">Publications</div>
      </Container>
    
     
      <Accordion >
           {/* {teamPublications.map((pub) => (
          <Publication pub={pub} key={pub._id} />
        ))} */}
        
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Fragment>
  );
};

export default Publications;
