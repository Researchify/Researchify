/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from 'react';
import { Container, CardGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
// icons
import { BsPencilSquare, BsServer, BsDisplayFill } from 'react-icons/bs';
// css
import './Dashboard.css';
// Component
import TemplateSelector from './TemplateSelector';

/**
 * Dashboard Component
 */
const Dashboard = () => {
  const teamId = useSelector((state) => state.team.teamId);

  // Display pop up window
  const [displayModal, setDisplay] = useState(false);
  const showModal = () => setDisplay(true);
  const closeModal = () => setDisplay(false);

  return (
    <Container fluid className="researchify-dashboard-container">
      <Card className="text-center researchify-dashboard-card">
        <Card.Body>
          <Button onClick={showModal}> Select a theme </Button>
        </Card.Body>

        <Card.Body className="researchify-dashboard-card-description">
          Click the button to select or update your website theme.
        </Card.Body>

        {/* Bottom layer of the card with three icons */}
        <CardGroup className="researchify-dashboard-card-group">
          <Card>
            <Link className="researchify-dashboard-card-link">
              <Card.Body>
                <BsPencilSquare className="researchify-dashboard-card-icons" />
              </Card.Body>
              <p>Editor</p>
            </Link>
          </Card>
          <Card>
            <Link className="researchify-dashboard-card-link">
              <Card.Body>
                <BsServer className="researchify-dashboard-card-icons" />
              </Card.Body>
              <p>API Acess Manager</p>
            </Link>
          </Card>
          <Card>
            <Link className="researchify-dashboard-card-link">
              <Card.Body>
                <BsDisplayFill className="researchify-dashboard-card-icons" />
              </Card.Body>
              <p>Website</p>
            </Link>
          </Card>
        </CardGroup>
      </Card>

      <TemplateSelector
        teamId={teamId}
        displayModal={displayModal}
        closeModal={closeModal}
      />
    </Container>
  );
};

export default Dashboard;
