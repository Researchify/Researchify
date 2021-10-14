/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container, Tabs, Tab,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Dashboard.css';
import Webpages from './webpage/Webpages';
import DeployPage from './deploy/DeployPage';
import { availablePages } from '../../config/clientWebsite';

const Dashboard = () => {
  const history = useHistory();

  const teamId = useSelector((state) => state.team.teamId);
  const { pages: currentWebPages, loading } = useSelector((state) => state.website);

  const [pageToDelete, setPageToDelete] = useState('None');

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

  return (
    <>
      <main>
        <Container fluid className="p-5">
          <Tabs
            defaultActiveKey="home"
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
        </Container>
      </main>
      <DeployPage teamId={teamId} />
    </>
  );
};

export default Dashboard;
