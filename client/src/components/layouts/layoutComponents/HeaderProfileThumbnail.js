import { Image } from 'react-bootstrap';
import React from 'react';
import { PropTypes } from 'prop-types';

const HeaderProfileThumbnail = React.forwardRef(({ children, onClick }, ref) => (
  <Image
    className="header-profile-img"
    src={children}
    roundedCircle
    height="45px"
    width="45px"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}

  />
));

HeaderProfileThumbnail.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default HeaderProfileThumbnail;
