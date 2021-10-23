/**
 *    This file contains the Layout Thumbnail Component.
 */
import {
  Card, Button, Modal, Carousel, Row, Col, Container,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import './LayoutThumbnail.css';
import TemplateData from './TemplateData';

const LayoutThumbnail = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { layoutOption, darkModeOption } = props;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const {
    // eslint-disable-next-line no-unused-vars
    layoutName, layoutDescription, lightImages, darkImages,
  } = TemplateData(layoutOption);
  let previewImages = lightImages;
  if (darkModeOption) {
    previewImages = darkImages;
  }
  const {
    layoutLandingImage, layoutPublicationImage, layoutTeamImage, layoutAchievementsImage,
  } = previewImages;
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
            {layoutName}
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
              <Col sm={2}>
                {' '}
                {layoutDescription}
                {' '}
              </Col>
            </Row>
          </Container>

        </Modal.Body>
      </Modal>
    );
  }
};

LayoutThumbnail.propTypes = {
  layoutOption: PropTypes.number.isRequired,
  darkModeOption: PropTypes.bool.isRequired,
};
export default LayoutThumbnail;
