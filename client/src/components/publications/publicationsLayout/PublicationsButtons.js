import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { AiFillFileAdd } from 'react-icons/ai';
import '../publications.css';

const PublicationsButtons = ({ setShowCreateForm, setShowImportForm }) => (
  <Dropdown>
    <Dropdown.Toggle size="sm">
      <AiFillFileAdd />
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => setShowCreateForm(true)}>Add Publication</Dropdown.Item>
      <Dropdown.Item onClick={() => setShowImportForm(true)}>Import Publication</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default PublicationsButtons;
