/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container, Card, Tabs, Tab, Modal, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TemplateSelector from './TemplateSelector';
import './Dashboard.css';

import Webpages from './webpage/Webpages';
import DeployPage from './deploy/DeployPage';
import { availablePages } from '../../config/clientWebsite';

const Dashboard = () => {
  const history = useHistory();

  const teamId = useSelector((state) => state.team.teamId);
  const { pages: currentWebPages, loading } = useSelector((state) => state.website);

  const pagePlaceholder = 'Select page to add';
  const [selectedPage, setSelectedPage] = useState(pagePlaceholder);

  const [currentTab, setCurrentTab] = useState('home');

  const [modalShow, setModalShow] = React.useState(true);

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
      default:
        history.push('/');
    }
  };

  return (
    <main>
      <Container fluid className="p-5">
        <WelcomeModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
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
              setSelectedPage={setSelectedPage}
              selectedPage={selectedPage}
              availablePages={availablePages}
              loading={loading}
            />
          </Tab>
          <Tab eventKey="theme" title="Theme">
            <TemplateSelector teamId={teamId} />
          </Tab>
        </Tabs>
        {currentTab === 'home' ? (
          <Card className="text-left" id="table">
            <Card.Footer>
              <DeployPage teamId={teamId} currentWebPages={currentWebPages} />
            </Card.Footer>
          </Card>
        ) : (
          <Card />
        )}
      </Container>
    </main>
  );
  function WelcomeModal(props) {
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Welcome
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Body className="publication-body-column">
            <div className="modal-subheader">
              Welcome To Researchify!
            </div>
            <div className="modal-subheader">
              Add the pages required by your website in the dashboard and select the theme
            </div>
            <div className="modal-subheader">
              Our Homepage: Enter the text required for your landing page
            </div>
            <div className="modal-subheader">
              Publications: Add or import publications you wish to be displayed
            </div>
            <div className="modal-subheader">
              Team Profile: Manage your Team profile details
            </div>
            <div className="modal-subheader">
              Team Member: Add the team members in your research group
            </div>
            <div className="modal-subheader">
              Achievements: Add the achievements you wish to be displayed
            </div>
          </Card.Body>
        </Modal.Body>
        <Modal.Footer>
          {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default Dashboard;
