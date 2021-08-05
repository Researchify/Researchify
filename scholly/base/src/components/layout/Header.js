import React from 'react';
import { Navbar } from 'react-bootstrap';
import {TEAM_INFO} from "../../global/data";
import './Header.css';

import { Fragment } from 'react';

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = () => {
    const orgName = TEAM_INFO.orgName;
    return (
        <Fragment>
        <Navbar className="header" sticky="top">
            <Navbar.Brand>
            <div className="header-brand">
                {orgName}
            </div>
            </Navbar.Brand>
        </Navbar>
        </Fragment>
    );
};

export default Header;
