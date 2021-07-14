/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from 'react';
import { Container, CardGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
// icons
import { BsPencilSquare, BsServer, BsDisplayFill } from 'react-icons/bs';
// css
import './Dashboard.css';
// Api
import api from '../../api/api';
// Component
import CreateWebsiteButton from './CreateWebsiteButton';
import InitialiseWebsiteForm from './InitialiseWebsiteForm';

/**
 * Check if website is created.
 * Assume website is created when template Id is stored.
 */
const checkWebsiteCreated = (teamId) => {
  try {
    let res = api.get(`team/${teamId}/templateId`);
    if (Object.entries(res).length === 0) {
      return false;
    }
  } catch (err) {
    // TODO: change to toast.error
    console.error(
      `Error when checking websiteIsCreated of user in Dashboard.js: ${err}`
    );
    return false;
  }
  return true;
};

/**
 * Dashboard Component
 */
const Dashboard = () => {
  const teamId = useSelector((state) => state.team.teamId);

  const [websiteIsCreated, setWebsiteIsCreated] = useState(
    checkWebsiteCreated(teamId)
  );
  const createWebsite = () => setWebsiteIsCreated(true);

  // Display pop up window
  const [displayModal, setDisplay] = useState(false);
  const showModal = () => setDisplay(true);
  const closeModal = () => setDisplay(false);

  return (
    <Container fluid className="researchify-dashboard-container">
      <Card className="text-center researchify-dashboard-card">
        <Card.Body>
          <CreateWebsiteButton
            websiteIsCreated={websiteIsCreated}
            clickFunction={showModal}
          />
        </Card.Body>

        <Card.Body className="researchify-dashboard-card-description">
          {websiteIsCreated
            ? 'Your website is created, edit your website in editor.'
            : 'Click the button to get started.'}
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

      <InitialiseWebsiteForm
        teamId={teamId}
        displayModal={displayModal}
        closeModal={closeModal}
        createWebsite={createWebsite}
      />
    </Container>
  );
};

export default Dashboard;
