/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container, Card, Tabs, Tab,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Dashboard.css';

import { PrimaryButton } from '../shared/styledComponents';
import Webpages from './webpage/Webpages';
import DeployPage from './deploy/DeployPage';
import { availablePages } from '../../config/clientWebsite';

const Dashboard = () => {
  const history = useHistory();

  const teamId = useSelector((state) => state.team.teamId);
  const { pages: currentWebPages, loading } = useSelector((state) => state.website);

  const [pageToDelete, setPageToDelete] = useState('None');

  const [currentTab, setCurrentTab] = useState('home');

  const directToAnotherPage = (pageName) => {
    switch (pageName) {
      case 'PUBLICATIONS':
        history.push('/publications');
        break;
      case 'TEAM':
        history.push('/team');
        break;
      case 'HOME PAGE':
        history.push('/about-us');
        break;
      case 'ACHIEVEMENTS':
        history.push('/achievement');
        break;
      default:
        history.push('/');
    }
  };

  const [showDeployModal, setShowDeployModal] = useState(false);
  const handleDeploy = () => setShowDeployModal(true);
  const handleDeployModalClose = () => setShowDeployModal(false);

  return (
    <main>
      <Container fluid className="p-5">
        <Tabs
          defaultActiveKey="home"
          onSelect={(k) => setCurrentTab(k)}
          transition={false}
          className="mb-3"
        >
          <Tab eventKey="home" title="Webpages">
            <Webpages
              currentWebPages={currentWebPages}
              directToAnotherPage={directToAnotherPage}
              teamId={teamId}
              setPageToDelete={setPageToDelete}
              pageToDelete={pageToDelete}
              availablePages={availablePages}
              loading={loading}
            />
          </Tab>

        </Tabs>
        {currentTab === 'home' ? (
          <Card className="text-left" id="table">
            <Card.Footer>
              <PrimaryButton onClick={handleDeploy} className="float-right">Deploy Website</PrimaryButton>
              <DeployPage teamId={teamId} currentWebPages={currentWebPages} showModal={showDeployModal} handleClose={handleDeployModalClose} />
            </Card.Footer>
          </Card>
        ) : (
          <Card />
        )}
      </Container>
    </main>
  );
};

export default Dashboard;
