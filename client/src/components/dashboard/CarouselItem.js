import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

const CarouselItem = ({ pages }) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel style={{ border: '1px solid black' }} variant="dark" activeIndex={index} onSelect={handleSelect}>
      {
        pages.map((page) => (
          <Carousel.Item
            style={{
              maxwidth: '400px',
              maxheight: '350px',
            }}
            variant="dark"
          >
            <img
              className="d-block w-100"
              src={page}
              alt="preview page"
            />
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
};

// props validation
CarouselItem.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default CarouselItem;
