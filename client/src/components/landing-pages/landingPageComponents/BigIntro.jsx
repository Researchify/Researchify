import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import { Button } from "@material-ui/core";
import "../css/big-intro.css";
import "../css/big-intro.mobile.css";
import styled from "styled-components";
import AnchorLink from "react-anchor-link-smooth-scroll";
import IntroImage from '../../../images/intro.svg';

const StyledButtonLink = styled(AnchorLink)`
  &:hover {
    text-decoration: none;
  }
`;
const DiscoverButtonLink = (props) => {
  return (
    <Fragment>
      <StyledButtonLink {...props} />
    </Fragment>
  );
};

const Content = () => {
  return (
    <div className="context ">
      <Row style={{ margin: 0 }} >
        <Col lg={{size: 7, offset: 1}} className="frosted-glass">
          <div style={{padding: '2rem'}}>
            <h1>
              A Research Profile Builder
            </h1>
            <p>
              Researchify is a web application that helps researchers without programming nor 
              graphic design knowledge to build and publish their own research profile website.
            </p>

            <DiscoverButtonLink href="#about" style={{}}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className={"mr-2"}
              >
                Discover More
              </Button>

            </DiscoverButtonLink>
          </div>
        </Col>
        <Col lg={{size: 2}} >
          <img src={IntroImage} alt="man watching presentation" width={370}/>
        </Col>
      </Row>
    </div>
  );
};

const BigIntro = () => {
  const boxes = () => {
    let array = [],
      numberOfBox = 15;
    for (let i = 0; i < numberOfBox; i++) array.push(i);
    return array;
  };

  const styles = {
    container: {
      position: "relative",
      top: 0,
      minHeight: "50vh",
    },
  };

  return (
    <div style={styles.container}>
      <Content />
      <div className="area">
        <ul className="circles">
          {boxes().map((i) => (
            <li key={i} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BigIntro;
