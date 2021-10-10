/**
 *    This file contains the Layout Thumbnail Component.
 */
import {
  Card, Button, Modal, Carousel, Row, Col, Container,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import './LayoutThumbnail.css';

// Image Imports for Layout Previews
// Layout 1
import layout1LightLandingPage from '../../images/layoutPreviews/layout1/light/layout_1_light_landingPage.png';
import layout1LightPublications from '../../images/layoutPreviews/layout1/light/layout_1_light_publications.png';
import layout1LightTeamPage from '../../images/layoutPreviews/layout1/light/layout_1_light_team.png';
import layout1LightAchievements from '../../images/layoutPreviews/layout1/light/layout_1_light_achievements.png';

// Layout 2
import layout2LightLandingPage from '../../images/layoutPreviews/layout2/light/layout_2_light_landingPage.png';
import layout2LightPublications from '../../images/layoutPreviews/layout2/light/layout_2_light_publications.png';
import layout2LightTeamPage from '../../images/layoutPreviews/layout2/light/layout_2_light_team.png';
import layout2LightAchievements from '../../images/layoutPreviews/layout2/light/layout_2_light_achievements.png';

// Layout 3
import layout3LightLandingPage from '../../images/layoutPreviews/layout3/light/layout_3_light_landingPage.png';
import layout3LightPublications from '../../images/layoutPreviews/layout3/light/layout_3_light_publications.png';
import layout3LightTeamPage from '../../images/layoutPreviews/layout3/light/layout_3_light_team.png';
import layout3LightAchievements from '../../images/layoutPreviews/layout3/light/layout_3_light_achievements.png';

import noPreview from '../../images/defaultThumbnail.png';

const LayoutThumbnail = (props) => {
  const { layoutOption } = props;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let layoutLandingImage;
  let layoutPublicationImage;
  let layoutTeamImage;
  let layoutAchievementsImage;

  switch (layoutOption) {
    case 1:
      layoutLandingImage = layout1LightLandingPage;
      layoutPublicationImage = layout1LightPublications;
      layoutTeamImage = layout1LightTeamPage;
      layoutAchievementsImage = layout1LightAchievements;
      break;
    case 2:
      layoutLandingImage = layout2LightLandingPage;
      layoutPublicationImage = layout2LightPublications;
      layoutTeamImage = layout2LightTeamPage;
      layoutAchievementsImage = layout2LightAchievements;
      break;
    case 3:
      layoutLandingImage = layout3LightLandingPage;
      layoutPublicationImage = layout3LightPublications;
      layoutTeamImage = layout3LightTeamPage;
      layoutAchievementsImage = layout3LightAchievements;
      break;
    default:
      layoutPublicationImage = noPreview;
  }
  return (
    <>
      <Card border="dark" className="mt-3 layout-thumbnail-card">
        <Card.Img
          src={layoutPublicationImage}
          className=" layout-thumbnail-card-image"
        />
        <Card.ImgOverlay>
          <div className="layout-thumbnail-transition-content">
            <Button variant="" className="layout-thumbnail-transition-button" onClick={handleShowModal}>
              Preview
            </Button>
            <LayoutPreviewModal />
          </div>
        </Card.ImgOverlay>
      </Card>
    </>
  );

  function LayoutPreviewModal() {
    return (
      <Modal dialogClassName="layout-preview-dialog" className="layout-preview-modal" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Layout
            {' '}
            {layoutOption}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col sm={10}>
                <Carousel variant="dark">
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={layoutLandingImage}
                      alt="Publications Page slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                      <h3> Home </h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={layoutPublicationImage}
                      alt="Publications Page slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                      <h3> Publications </h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={layoutTeamImage}
                      alt="Publications Page slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                      <h3> Team </h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={layoutAchievementsImage}
                      alt="Publications Page slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                      <h3> Achievements </h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col sm={2}> Description </Col>
            </Row>
          </Container>

        </Modal.Body>
      </Modal>
    );
  }
};

LayoutThumbnail.propTypes = {
  layoutOption: PropTypes.number.isRequired,
};
export default LayoutThumbnail;
