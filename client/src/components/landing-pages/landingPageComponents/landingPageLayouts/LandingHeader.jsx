import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
// import logo from "Assets/images/logo.png";
import { PropTypes } from 'prop-types';
import AuthButtons from './AuthButtons';
import HeaderLink from '../../utils/StyledHeaderLink';
import { headerLinks } from '../../data/landing-page-labels';
import { theme } from '../../theme';

const Header = ({ linksAreShown }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const styles = {
    shadow: {
      backgroundColor: 'white',
      transition: 'top 0.5s',
      boxShadow: '0px 14px 25px -20px rgba(0,0,0,0.1)',
    },
  };

  const hideAndShowNavBar = () => {
    if (typeof window !== 'undefined') {
      let prevScrollpos = window.pageYOffset;
      const navbar = document.getElementById('navbar');
      window.onscroll = function () { // eslint-disable-line func-names
        const maxScroll = document.body.clientHeight - window.innerHeight;
        const currentScrollPos = window.pageYOffset;
        if (
          (maxScroll > 0
            && prevScrollpos > currentScrollPos
            && prevScrollpos <= maxScroll)
          || (maxScroll <= 0 && prevScrollpos > currentScrollPos)
          || (prevScrollpos <= 0 && currentScrollPos <= 0)
        ) {
          navbar.style.top = '0'; // show
        } else {
          navbar.style.top = '-5.5rem'; // hide
        }
        prevScrollpos = currentScrollPos;
      };
    }
  };

  useEffect(() => {
    hideAndShowNavBar();
  }, []);

  return (
    <>
      <Navbar id="navbar" light expand="md" style={styles.shadow} sticky="top">
        <NavbarBrand href="/">
          <h2 style={{ color: theme.dark }}>
            RE
            <b style={{ color: theme.primary }}>SEARCH</b>
            IFY
          </h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {linksAreShown
              && headerLinks.map((h, index) => {
                return (
                  <NavItem key={h.link}>
                    <HeaderLink id={index} href={h.link}>
                      {h.label}
                    </HeaderLink>
                  </NavItem>
                );
              })}
          </Nav>
          <Nav>
            <AuthButtons />
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

//props validation
Header.propTypes = {
  linksAreShown: PropTypes.bool,
};
Header.defaultProps = {
  linksAreShown: true,
};

export default Header;
