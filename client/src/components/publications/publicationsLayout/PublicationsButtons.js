import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { AiFillFileAdd } from 'react-icons/ai';

const PublicationsButtons = ({ setShowCreateForm, setShowImportForm }) => (
  <Dropdown size="sm">
    <Dropdown.Toggle>
      <AiFillFileAdd />
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => setShowCreateForm(true)}>Add Publication</Dropdown.Item>
      <Dropdown.Item onClick={() => setShowImportForm(true)}>Import Publication</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default PublicationsButtons;
