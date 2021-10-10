import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import '../Dashboard.css';

const WebpageCard = ({
  page, description, handlePageSelection,
}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    handlePageSelection(page);
  };

  return (
    <>
      <Form.Group>
        <Card
          className={selected === true ? 'selected-card' : 'card'}
          style={{ width: '17rem', borderRadius: '13px' }}
          onClick={handleClick}
        >
          <Card.Body>
            <div style={{ display: 'flex' }}>
              <Card.Title>
                {page}
              </Card.Title>
            </div>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Form.Group>
    </>
  );
};

WebpageCard.propTypes = {
  page: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handlePageSelection: PropTypes.func.isRequired,
};

export default WebpageCard;
