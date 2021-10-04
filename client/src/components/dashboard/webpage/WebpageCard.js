import React from 'react';
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

const WebpageCard = ({ page, description }) => (
  <>
    <Card style={{ width: '18rem' }} onClick={console.log(page)}>
      <Card.Body>
        <Card.Title>{page}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  </>
);

WebpageCard.propTypes = {
  page: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default WebpageCard;
