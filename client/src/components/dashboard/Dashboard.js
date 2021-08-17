/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Card,
  Tooltip,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TemplateSelector from './TemplateSelector';
import './Dashboard.css';

import toast from 'react-hot-toast';
import Webpages from './webpage/Webpages';
import DeployPage from './deploy/DeployPage';
import WebpageSelector from './webpage/WebpageSelector';
import { availablePages } from '../../config/clientWebsite';

const Dashboard = () => {
  const history = useHistory();

  const themePicked = useSelector((state) =>
    state.team?.themeId ? true : false
  );
  const teamId = useSelector((state) => state.team.teamId);
  const currentWebPages = useSelector((state) => state.website.pages);

  const pagePlaceholder = 'Select page to add';
  const [selectedPage, setSelectedPage] = useState(pagePlaceholder);

  const directToAnotherPage = (pageName) => {
    if (pageName === 'PUBLICATIONS') {
      history.push(`/publications`);
    } else if (pageName === 'TEAM') {
      history.push(`/team`);
    }
  };

  return (
    <main>
      <Container fluid className="p-5">
        <Tabs defaultActiveKey="home" transition={false} className="mb-3">
          <Tab eventKey="home" title="Webpages">
            <Webpages
              currentWebPages={currentWebPages}
              directToAnotherPage={directToAnotherPage}
              teamId={teamId}
              setSelectedPage={setSelectedPage}
              selectedPage={selectedPage}
              availablePages={availablePages}
            />
          </Tab>
          <Tab eventKey="theme" title="Theme">
            <TemplateSelector teamId={teamId} />
          </Tab>
        </Tabs>
        <Card className="text-left" id="table">
          <Card.Footer>
            <DeployPage teamId={teamId} currentWebPages={currentWebPages} />
          </Card.Footer>
        </Card>
        
      </Container>
    </main>
  );
};

export default Dashboard;
