import { Card, Button } from 'react-bootstrap';
import React from 'react';
import { PropTypes } from 'prop-types';
import './LayoutThumbnail.css';
import layout1 from '../../images/layout_1.png';
import layout2 from '../../images/layout_2.png';
import layout3 from '../../images/layout_3.png';
import noPreview from '../../images/defaultThumbnail.png';
/**
 *    This file contains the Layout Thumbnail Component.
 */

const LayoutThumbnail = (props) => {
  const { layoutOption } = props;
  let layoutImage;
  switch (layoutOption) {
    case 1:
      layoutImage = layout1;
      break;
    case 2:
      layoutImage = layout2;
      break;
    case 3:
      layoutImage = layout3;
      break;
    default:
      layoutImage = noPreview;
  }
  return (
    <>
      <Card border="dark" className="mt-3 layout-thumbnail-card">
        <Card.Img
          src={layoutImage}
          className=" layout-thumbnail-card-image"
        />
        <Card.ImgOverlay>
          <div className="layout-thumbnail-transition-content">
            <Button variant="" className="layout-thumbnail-transition-button"> Preview </Button>
          </div>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};

LayoutThumbnail.propTypes = {
  layoutOption: PropTypes.number.isRequired,
};
export default LayoutThumbnail;
