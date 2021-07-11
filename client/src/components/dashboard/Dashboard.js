/**
 * This file exports the content in of Researchify Dashboard Page
 */
import React, { useState } from "react";
import {
  Container,
  Button,
  Modal,
  CardGroup,
  Card,
  Form,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// /** Redux **/
// import { useDispatch, useSelector } from "react-redux";
// import { createWebsite } from "../../actions/website";

/** icons **/
import {
  BsPencilSquare,
  BsServer,
  BsDisplayFill,
  BsCheck,
} from "react-icons/bs";

/** css **/
import "./Dashboard.css";

// import picutre of each layout
import singleColumnLayout from "../../images/single-column-layout.png";
import fShapeLayout from "../../images/f-shape-layout.png";
import zigZagLayout from "../../images/zig-zag-layout.png";

// /** api to patch github token **/
// import api from "../../api/api";
// import { createRepository } from "../github";

// const handleRepoCreation = (created, response) => {
//   if (created) {
//     console.log("Repo created");
//   } else {
//     console.log("Repo failed to create");
//   }
// };

// /** Pass the github username and token into api **/
// const storeGithubToken = (teamId, username, token) => {
//   // TODO: validate the input and token (token start with 'ghp_' and has total 40 characters)

//   try {
//     //createRepository(githubToken, githubUsername, "Team Name", handleRepoCreation)
//     api.patch(`team/${teamId}`, { githubToken: token });
//     api.patch(`team/${teamId}`, { githubUsername: username });
//   } catch (err) {
//     console.error(
//       `Error in patching github token/username in Dashboard.js: ${err}`
//     );
//   }
// };

// Conditional Rendering - button to create a website
const CreateWebsiteButton = (props) => {
  if (!props.isCreated) {
    return(
      <Button onClick={props.clickFunction}> Build a new Website </Button>
    )
  }
  return null;
}

const Dashboard = () => {
  // check if website is created / github token is stored
  // TODO: get the token info from database and check
  const [websiteIsCreated, createWebsite] = useState(false);

  // Managing the display of each modal
  const [displayModal, setDisplay] = useState({
    githubModal: false,
    templateSelector: false,
  });
  // function to open/close window for inputting github token
  const showGithubModal = () => setDisplay({ githubModal: true });
  const closeGithubModal = () => setDisplay({ githubModal: false });
  // function to open/close window for customising template
  const showTemplateSelector = () => setDisplay({ templateSelector: true });
  const closeTemplateSelector = () => setDisplay({ templateSelector: false });

  // Storing and passing github token and username
  const [github, setGithub] = useState({
    username: null,
    token: null,
  });
  const updateGithub = (form) => {
    const { name, value } = form.target;
    setGithub({ ...github, [name]: value });
  };

  // Storing and passing layout and theme selection
  const [templates, setTemplates] = useState({
    theme: null,
    layout: null,
  });
  // update the template selection
  const updateTemplate = (form) => {
    const { name, value } = form.target;
    setTemplates({ ...templates, [name]: value });
  };

  // ---------- below is to get team id and use it to call api to update the github token and username -------
  // const teamId = useSelector((state) => state.team.teamId);

  //   // Set the state of 'website.isCreated' to display different button
  //   const dispatch = useDispatch();
  //   const websiteIsCreated = useSelector((state) => state.team.repoCreated);
  // -----------------------------until here --------------------------------

  return (
    <Container fluid className="researchify-dashboard-container">
      <Card className="text-center researchify-dashboard-card">
        <Card.Body>
          <CreateWebsiteButton isCreated={websiteIsCreated} clickFunction={showGithubModal} />
        </Card.Body>

        <Card.Body className="researchify-dashboard-card-description">
          {websiteIsCreated
            ? "Your website is created, edit your website in editor."
            : "Click the button to enter Personal Acess Token and get started."}
        </Card.Body>

        {/* Bottom layer of the three icons */}
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

      {/*'Pop up - Entering User GitHub Pages Token'*/}
      <Modal
        show={displayModal.githubModal}
        onHide={closeGithubModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter your GitHub Credentials
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="researchify-github-form">
            <Form.Group controlId="formGithubUsername">
              <Form.Label>Github Username</Form.Label>
              <Form.Control
                onChange={updateGithub}
                name="username"
                type="text"
                placeholder="Enter your GitHub Username Here"
                required
              />
            </Form.Group>

            <Form.Group controlId="formGithubToken">
              <Form.Label>Github Personal Access Token</Form.Label>
              <Form.Control
                onChange={updateGithub}
                name="token"
                type="text"
                placeholder="Enter your GitHub Personal Access Token Here"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              // storeGithubToken(teamId, username, token);
              closeGithubModal(); // close the github pop up
              showTemplateSelector(); // open template selector pop up
            }}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pop up - modal to select a theme and layout*/}
      <Modal
        show={displayModal.templateSelector}
        onHide={closeTemplateSelector}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select the a theme and layout for your website
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Section to select a theme colour */}
          <div className="theme-selection-column">
            <p>Select a theme colour</p>
            <Container fluid className="theme-selector">
              <Row>
                {/* TODO: Determine the final theme colour combination */}
                <Button className="theme-icon-wrapper" variant="link">
                  <div className="theme-icon green-theme-icon"></div>
                </Button>
                <Button className="theme-icon-wrapper" variant="link">
                  <div className="theme-icon lightblue-theme-icon"></div>
                </Button>
                <Button className="theme-icon-wrapper" variant="link">
                  <div className="theme-icon blackwhite-theme-icon"></div>
                </Button>
              </Row>
            </Container>
          </div>

          {/* Section to select a website layout */}
          <div className="layout-selection-column">
            <p>Select a layout</p>
            <Container fluid className="layout-selector">
              <Row>
                <Col className="layout-display">
                  <Button className="layout-icon-wrapper" variant="link">
                    <Image src={singleColumnLayout} className="img-fluid" />
                  </Button>
                </Col>
                <Col className="layout-display">
                  <Button className="layout-icon-wrapper" variant="link">
                    <Image src={fShapeLayout} className="img-fluid" />
                  </Button>
                </Col>
                <Col className="layout-display">
                  <Button className="layout-icon-wrapper" variant="link">
                    <Image src={zigZagLayout} className="img-fluid" />
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              closeTemplateSelector();
              createWebsite(true);
            }}
          >
            <BsCheck />
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
