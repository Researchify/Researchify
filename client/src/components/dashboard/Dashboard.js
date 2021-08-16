/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Button,
  Card,
  Image,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TemplateSelector from './TemplateSelector';
import './Dashboard.css';

import toast from 'react-hot-toast';
import Webpages from './webpage/Webpages';
import DeployPage from './deploy/DeployPage';
import defaultTheme from '../../images/theme1.png';
import WebpageSelector from './webpage/WebpageSelector';
import fShapeLayout from '../../images/f-shape-layout.png';

const Dashboard = () => {

  const history = useHistory();

  const themePicked = useSelector((state) =>
    state.team?.themeId ? true : false
  );
  const teamId = useSelector((state) => state.team.teamId);
  const currentWebPages = useSelector((state) => state.website.pages);

  const pagePlaceholder = 'Select page to add';
  const [selectedPage, setSelectedPage] = useState(pagePlaceholder);

  const [displayPageModal, setDisplayPageModal] = useState(false);
  const showDisplayPageModal = () => setDisplayPageModal(true);
  const closeDisplayPageModal = () => setDisplayPageModal(false);

  // Display pop up window for selecting a theme
  const [displayThemeModal, setDisplayThemeModel] = useState(false);
  const showThemeModal = () => setDisplayThemeModel(true);
  const closeThemeModal = () => {
    setDisplayThemeModel(false);
  };

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
        <Card className="text-left" id="table">
          <Card.Header className="heading1">
            Web Pages
            <Button
              onClick={showDisplayPageModal}
              className="float-right btn btn-primary cardButton buttonPrimary"
            >
              Add
            </Button>
          </Card.Header>
          <Card.Body>
            <Webpages
              currentWebPages={currentWebPages}
              directToAnotherPage={directToAnotherPage}
              // showDeleteModal={showDeleteModal}
              teamId={teamId}
              setSelectedPage={setSelectedPage}
              selectedPage={selectedPage}
            />
          </Card.Body>
          <Card.Footer>
            <DeployPage teamId={teamId} />
          </Card.Footer>
        </Card>
        <TemplateSelector
          teamId={teamId}
          displayModal={displayThemeModal}
          closeModal={closeThemeModal}
        />
        <WebpageSelector
          teamId={teamId}
          currentWebPages={currentWebPages}
          displayModal={displayPageModal}
          closeModal={closeDisplayPageModal}
        />
        
      </Container>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Current Theme</Card.Title>
          <Card.Text>
            <div className="mb-3 mt-3 text-center">
              {themePicked ? (
                <Image src={defaultTheme} className="img-fluid" />
              ) : (
                'No theme chosen yet'
              )}
              <Button variant="primary" onClick={showThemeModal}>
                Choose Theme
              </Button>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </main>
  );
};

export default Dashboard;
