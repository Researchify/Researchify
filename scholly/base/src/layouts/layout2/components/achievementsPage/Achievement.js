/**
 * This component display a single award as a card component.
 * trial comment
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Row, Col, Button,
} from 'react-bootstrap';
import awardPicture from '../../../../shared/images/awardpic.jpg';

const Achievement = ({ achievement }) => {
  const ref = useRef();
  const [expanded, setExpanded] = useState(true);
  const [shouldShowExpand, setShouldShowExpand] = useState(false);
  const MAX_EXPANDED_HEIGHT = 500;
  const maxHeight = 90;
  useEffect(() => {
    if (ref.current.scrollHeight > maxHeight) {
      setShouldShowExpand(true);
      setExpanded(false);
    }
  }, [maxHeight]);
  return (
    <Col>
      <Card className="award-card m-4 border-0 shadow ">
        <Row>
          <Col>
            <Card.Body>
              <Card.Title as="h5">{achievement.title}</Card.Title>
              <Card.Text as="h6">
                {achievement.yearAwarded}
              </Card.Text>
              <hr />
              <Card.Text as="h7">
                <div style={{ maxHeight: expanded ? MAX_EXPANDED_HEIGHT : maxHeight }} className="award-summary" ref={ref}>
                  {achievement.description}
                </div>
              </Card.Text>
              <br />
              {
                                shouldShowExpand && (
                                <Button className="read-more-button" variant="dark" onClick={() => setExpanded(!expanded)}>
                                  Read
                                  {expanded ? ' Less' : ' More'}
                                </Button>
                                )

                            }

            </Card.Body>
          </Col>
          <Col>
            <Card.Img src={awardPicture} className="award-picture" />
          </Col>
        </Row>
      </Card>
    </Col>

  );
};

export default Achievement;
