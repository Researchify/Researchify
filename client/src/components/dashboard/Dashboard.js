/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Button,
  Card,
  Modal,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import TemplateSelector from './TemplateSelector';
import './Dashboard.css';
import { addPage, deletePage } from '../../actions/website';
import { availablePages as pages } from '../../config/clientWebsite';
import toast from 'react-hot-toast';
import Webpages from './webpage/Webpages';
import DeployPage from '../deploy/DeployPage';
import { getGHAccessToken } from '../../actions/team';

const Dashboard = () => {

  console.log("dashborad")
  const dispatch = useDispatch();
  const history = useHistory();

  const themePicked = useSelector((state) => state.team?.themeId ? true : false);
  const teamId = useSelector((state) => state.team.teamId);
  const currentWebPages = useSelector((state) => state.website.pages);


  // All our web-page offerings
  const availablePages = pages;

  // webpageOfferings = availablePages - currentWebPages
  const webpageOfferings = availablePages.filter(
    (page) => !currentWebPages.includes(page)
  );

  const pagePlaceholder = 'Select page to add';
  const [selectedPage, setSelectedPage] = useState(pagePlaceholder);

  // To control disabling the 'Next' Button in the pop-up
  const [displayButton, setDisplayButton] = useState(true);

  // Display pop up window for Adding a page
  const [displayAddModal, setAddModal] = useState(false);

  const showAddModal = () => {
    // Show modal to add web-pages if the client has already selected a theme
    if (themePicked) {
      if (webpageOfferings.length === 0) {
        toast.success("You've already added all available web pages");
      }
      else {
        setAddModal(true);
      }
    } else {
      showThemeModal(true);
    }
  };
  const closeAddModal = () => setAddModal(false);

  // Display pop up window for Deleting a page
  const [displayDeleteModal, setDeleteModal] = useState(false);
  const showDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  // Display pop up window for selecting a theme
  const [displayThemeModal, setDisplayThemeModel] = useState(false);
  const showThemeModal = () => setDisplayThemeModel(true);
  const closeThemeModal = () => {
    setDisplayThemeModel(false);
    // Show modal to add web-page
    setAddModal(true);
  };

  const directToAnotherPage = (pageName) => {
    if (pageName === 'PUBLICATIONS') {
      history.push(`/publications`);
    } else if (pageName === 'TEAM') {
      history.push(`/team`);
    }
  };

  // Function runs when user selects a web-page to add to their website
  const onEditPage = () => {
    dispatch(addPage(teamId, selectedPage)).then(() => {
      directToAnotherPage(selectedPage);
    });
  };

  const handlePageSelection = (e) => {
    setSelectedPage(e);
    setDisplayButton(false);
  };

  const handleDelete = () => {
    dispatch(deletePage(teamId, selectedPage));
    setDeleteModal(false);
    setSelectedPage(pagePlaceholder);
  };



  return (
    <main>
      <Modal show={displayAddModal} onHide={closeAddModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Choose the Page you want to add to your website
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton
            className="mx-10"
            id="dropdown-basic-button"
            variant="secondary"
            title={selectedPage}
            onSelect={handlePageSelection}
          >
            {webpageOfferings.map((pageName) => (
              <Dropdown.Item eventKey={pageName}>{pageName}</Dropdown.Item>
            ))}
          </DropdownButton>
          <Button
            className="float-right"
            disabled={displayButton}
            onClick={onEditPage}
          >
            Next
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        show={displayDeleteModal}
        onHide={closeDeleteModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-center">
            Are you sure you want to delete the {selectedPage} page?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deleting the page will NOT remove the data associated with
          this page, but the page will not be shown on your website
          <Modal.Footer className="p-0">
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete This Page
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Container fluid className="p-5">
        <Card className="text-left" id="table">
          <Card.Header className="heading1">
            Web Pages
            <Button
              onClick={showAddModal}
              className="float-right btn btn-primary cardButton buttonPrimary"
            >
              Add
            </Button>
          </Card.Header>
          <Card.Body>
            <Webpages 
              currentWebPages={currentWebPages} 
              directToAnotherPage={directToAnotherPage} 
              showDeleteModal={showDeleteModal}
              setSelectedPage={setSelectedPage}
            />
          </Card.Body>
          <Card.Footer>
            <DeployPage teamId={teamId}/>
          </Card.Footer>
        </Card>
        <TemplateSelector
          teamId={teamId}
          displayModal={displayThemeModal}
          closeModal={closeThemeModal}
        />
      </Container>
    </main>
  );
};

export default Dashboard;
