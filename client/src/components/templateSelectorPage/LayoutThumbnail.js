import {
  Card, Button, Modal, Carousel, Row, Col, Container,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import './LayoutThumbnail.css';
// Image Imports for Layout Previews
// Layout 1
import layout1LightPublications from '../../images/layoutPreviews/layout1/light/layout_1_light_publications.png';
import layout2LightPublications from '../../images/layoutPreviews/layout2/light/layout_2_light_publications.png';
import layout3LightPublications from '../../images/layoutPreviews/layout3/light/layout_3_light_publications.png';
import noPreview from '../../images/defaultThumbnail.png';
/**
 *    This file contains the Layout Thumbnail Component.
 */

const LayoutThumbnail = (props) => {
  const { layoutOption } = props;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let layoutPublicationImage;
  switch (layoutOption) {
    case 1:
      layoutPublicationImage = layout1LightPublications;
      break;
    case 2:
      layoutPublicationImage = layout2LightPublications;
      break;
    case 3:
      layoutPublicationImage = layout3LightPublications;
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
                      src={layoutPublicationImage}
                      alt="Publications Page slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                      <h3> Publications Page</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={layoutPublicationImage}
                      alt="Publications Page slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                      <h3> Publications Page 2</h3>
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
