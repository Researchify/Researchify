/**
 * Header component coantins orgName and teamTeam 
 */
import React from 'react';
import { Navbar } from 'react-bootstrap';
import {TEAM_INFO} from "../../global/data";
import './header.css';

import { Fragment } from 'react';

const Header = () => {
    const {orgName, teamName} = TEAM_INFO;
    return (
        <Fragment>
        <Navbar className="header" sticky="top">
            <Navbar.Brand>
            <div className="header-brand">
                {teamName} @ {orgName}
            </div>
            </Navbar.Brand>
        </Navbar>
        </Fragment>
    );
};

export default Header;
