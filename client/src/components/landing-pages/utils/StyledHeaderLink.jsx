import React, { Fragment } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { theme } from "../theme";
import styled from "styled-components";

const HeaderLink = styled(AnchorLink)`
  color: ${theme.secondary};
  display: block;
  font-size: 1.2rem;
  padding: 0.7rem;
  text-decoration: none;
  transition: 0.5s;
  margin: 0 0.1rem;

  &:hover {
    background-color: ${theme.dark};
    transform: translateY(-2px);
    border-radius: 5%;
    color: white;
    text-decoration: none;
  }
`;

const StyledHeaderLink = (props) => (
  <Fragment>
    <HeaderLink {...props} />
  </Fragment>
);

export default StyledHeaderLink;
