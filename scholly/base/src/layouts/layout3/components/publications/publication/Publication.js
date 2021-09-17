/**
 * The Publication component displays a single publication.
 */
import React from 'react';
import {
  Accordion, Card, Modal, Button,
} from 'react-bootstrap';

const Publication = ({ pub }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Card className="publication-card">
      <Accordion.Toggle
        as={Card.Header}
        eventKey={pub._id}
        className="publication-title-column"
      >
        <div className="pub-category-above-title">{pub.category.type}</div>
        <div className="publication-title">
          {' '}
          {pub.title}
        </div>
        <div className="pub-year-below-title">
          {' '}
          {pub.yearPublished}
          {' '}
        </div>
        <Button variant="primary" className="button-pub" onClick={() => setModalShow(true)}>
          View this Publication
        </Button>
        <PublicationModal
          pub={pub}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Accordion.Toggle>
    </Card>
  );

  function PublicationModal(props) {
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {pub.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Body className="publication-body-column">
            <div className="pub-body-subheader">Authors</div>
            <div className="pub-body-content">
              {pub.authors.map((author) => `${author}`).join(', ')}
            </div>
            <div className="pub-body-subheader">Description</div>
            <div className="pub-body-content pub-body-paragraph">
              {pub.description}
            </div>
            <div className="pub-body-subheader">
              {pub.category.categoryTitle
                ? pub.category.type.charAt(0)
                + pub.category.type.slice(1).toLowerCase()
                : ''}
            </div>
            <div className="pub-body-content">
              {pub.category.categoryTitle
                ? pub.category.categoryTitle
                + (pub.category.issue ? `, Issue ${pub.category.issue}` : '')
                + (pub.category.volume ? `, Volume ${pub.category.volume}` : '')
                + (pub.category.pages ? `, Page ${pub.category.pages}` : '')
                : ''}
            </div>
            <div className="pub-body-subheader">
              {pub.category.publisher ? 'Published by' : null}
            </div>
            <div className="pub-body-content">{pub.category.publisher}</div>
          </Card.Body>
        </Modal.Body>
        <Modal.Footer>
          {/* eslint-disable-next-line react/destructuring-assignment */}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default Publication;
