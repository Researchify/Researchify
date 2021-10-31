/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Dashboard.css';
import Webpages from './webpage/Webpages';
import DeployBtn from './deploy/Deploy';
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
          <Webpages
            currentWebPages={currentWebPages}
            directToAnotherPage={directToAnotherPage}
            teamId={teamId}
            setPageToDelete={setPageToDelete}
            pageToDelete={pageToDelete}
            availablePages={availablePages}
            loading={loading}
          />

        </Container>
      </main>
      <DeployBtn teamId={teamId} />
    </>
  );
};

export default Dashboard;
