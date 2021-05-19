import React from "react"
import { Navbar, Nav, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';

import "../layout/Header.css"

import profilePicture from "../../images/user.png"
import { Fragment } from "react";

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const EditorHeader = ({title}) => {
    const userName = useSelector(state => state.user?.givenName + " " + state.user?.familyName);
    //TODO: Remove hard-coded team id and publications id from the links
    return (
        <Fragment>
            <Navbar className="header" sticky="top">
                <Navbar.Brand><Link className="header-brand" >{title}</Link></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link className="header-link">Visit Site</Link></Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="header-username">
                        <Link className="header-link" to="/dashboard/profile">
                            <Image className="profile-picture" src={profilePicture} roundedCircle /> {userName}
                        </Link>
                    </Nav.Link>
                </Nav>
            </Navbar>
        </Fragment>
    )
}

export default EditorHeader
