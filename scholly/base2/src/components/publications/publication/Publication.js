/**
 * The Publication component displays a single publication.
 */
import React, { useEffect, useState } from 'react';
import { Accordion, Card, Modal, Button } from 'react-bootstrap';

const Publication = ({ pub }) => {
  const [show, setShow] = useState(false);


  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Card className="publication-card">
      <Accordion.Toggle
        as={Card.Header}
        eventKey={pub._id}
        className="publication-title-column"
      >
        <div className="pub-category-above-title">{pub.category.type}</div>
        <div className="publication-title"> {pub.title}</div>
        <div className="pub-year-below-title"> {pub.yearPublished} </div>
        <Button variant="primary" className="button-pub" onClick={() => setModalShow(true)}>
          View this Publication
        </Button>
        <MyVerticallyCenteredModal
          pub ={pub}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

      </Accordion.Toggle>
      <Accordion.Collapse eventKey={pub._id}>
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
              ? pub.category.type.charAt(0) +
                pub.category.type.slice(1).toLowerCase()
              : ''}
          </div>
          <div className="pub-body-content">
            {pub.category.categoryTitle
              ? pub.category.categoryTitle +
                (pub.category.issue ? ', Issue ' + pub.category.issue : '') +
                (pub.category.volume ? ', Volume ' + pub.category.volume : '') +
                (pub.category.pages ? ', Page ' + pub.category.pages : '')
              : ''}
          </div>
          <div className="pub-body-subheader">
            {pub.category.publisher ? 'Published by' : null}
          </div>
          <div className="pub-body-content">{pub.category.publisher}</div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Publication;
