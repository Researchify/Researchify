/**
 * The ImportedPublication component displays an individual imported publication when the import is success
 */

import { Form, Card, Collapse } from 'react-bootstrap';
import './importedPublication.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

const ImportedPublication = ({ pub, index, setChecked }) => {
  const [expand, setExpand] = useState(false);
  const { publicationsToImport } = useSelector(
    (state) => state.importedPublications,
  );
  const { publications } = useSelector((state) => state.importedPublications);

  const dropDown = (
    <Collapse in={expand}>
      <div className="ml-3">
        <h6>
          {pub.category.type.charAt(0)
            + pub.category.type.slice(1).toLowerCase()}
          :
          {` ${pub.category.categoryTitle}`}
        </h6>
        {pub.category.issue && (
        <h6>
          Issue:
          {` ${pub.category.issue}`}
        </h6>
        )}
        {pub.category.volume && (
        <h6>
          Volume:
          {` ${pub.category.volume}`}
        </h6>
        )}
        {pub.category.pages && (
        <h6>
          Pages:
          {` ${pub.category.pages}`}
        </h6>
        )}
        {pub.category.publisher && (
          <h6>
            Publisher:
            {` ${pub.category.publisher}`}
          </h6>
        )}
        <h6>
          Description:
          {` ${pub.description}`}
        </h6>
        {/* { pub.link && <h6> Link: <a style={{cursor: 'pointer'}} onClick={() => window.open(`${pub.link}`, '_blank')}>{pub.link} </a> </h6> } */}
        {pub.link && (
          <h6>
            Link:
            <a
              href={pub.link}
              style={{ cursor: 'pointer' }}
              onClick={() => window.open(`${pub.link}`, '_blank')}
            >
              {` ${pub.link}`}
            </a>
          </h6>
        )}
      </div>
    </Collapse>
  );

  const handleChange = () => {
    setChecked(index);
    setExpand(expand);
  };

  return (
    <>
      <Card onClick={() => setExpand(!expand)}>
        <Card.Body>
          <Form>
            <Form.Group>
              <div className="inputGroupWithCheckbox">
                <Form.Check
                  type="checkbox"
                  checked={publicationsToImport[publications.indexOf(pub)]}
                  onChange={handleChange}
                />
                <Card.Title>
                  {' '}
                  {pub.title}
                  {' '}
                </Card.Title>
              </div>
            </Form.Group>
          </Form>

          <Card.Subtitle className="m-3 text-muted">
            {' '}
            {pub.authors.map((author) => `${author}`).join(', ')}
            {' '}
          </Card.Subtitle>
          <h6 className="ml-3">
            {' '}
            Year Published:
            {` ${pub.yearPublished}`}
          </h6>
          {dropDown}
        </Card.Body>
      </Card>
    </>
  );
};

// props validation
ImportedPublication.propTypes = {
  pub: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default ImportedPublication;
