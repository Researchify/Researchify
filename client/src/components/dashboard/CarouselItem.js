import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

const CarouselItem = ({ pages, darkMode }) => {
  const [index, setIndex] = useState(0);
  console.log(darkMode);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
      {
        pages.map((page) => (
          <Carousel.Item variant="dark" style={{ backgorundColor: 'red' }}>
            <img
              style={{ width: '400px', height: '350px' }}
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
  darkMode: PropTypes.bool.isRequired,
};

export default CarouselItem;
