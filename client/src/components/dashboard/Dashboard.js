/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Table,
  Button,
  Card,
  Modal,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import TemplateSelector from './TemplateSelector';
import './Dashboard.css';
import { addPage, deletePage } from '../../actions/website';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const repoCreated = useSelector((state) => state.team.repoCreated);
  const teamId = useSelector((state) => state.team.teamId);
  const currentWebPages = useSelector((state) => state.website.pages);

  // All our web-page offerings
  const availablePages = useSelector((state) => state.website.availablePages);

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
    // Show modal to ass web-pages if the client has already selected a theme (which happens when creating their repository)
    if (repoCreated) {
      setAddModal(true);
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

  const promptDeleteConfirmation = (pageName) => {
    setSelectedPage(pageName);
    showDeleteModal();
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
          Deleting the page would permanently remove all data associated with
          this page and the page will not be shown on your website
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
            <Table striped bordered hover>
              {
                // Display appropriate message when no webpage is added
                currentWebPages.length === 0 ? (
                  <thead>
                    <tr>
                      <th className="reduced-column tableHeading">
                        No web-page added yet...
                      </th>
                    </tr>
                  </thead>
                ) : (
                  ''
                )
              }
              <tbody>
                {currentWebPages.map((webPage, index) => (
                  <tr key={index}>
                    <td className="body">
                      {webPage}
                      <Button
                        variant="outline-danger"
                        className="action primary-danger float-right"
                        onClick={() => promptDeleteConfirmation(webPage)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outline-success"
                        className="action float-right mx-2"
                        onClick={() => {
                          directToAnotherPage(webPage);
                        }}
                      >
                        <BsPencilSquare />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
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
