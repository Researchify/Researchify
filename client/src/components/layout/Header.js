import React from "react"
import { Navbar, Nav, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';

import "./Header.css"

import profilePicture from "../../images/user.png"

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
function Header() {
    const userName = useSelector(state => state.user?.givenName + " " + state.user?.familyName);
    //TODO: Remove hard-coded team id and publications id from the links
    return (
        <Navbar bg="primary" variant="dark" className="header">
            <Navbar.Brand><Link className="header-brand" to="/dashboard">Researchify</Link></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link><Link className="header-link" to="/dashboard/profile">Profile</Link></Nav.Link>
                <Nav.Link><Link className="header-link" to="/publications/team">Publications </Link></Nav.Link>

            </Nav>
            <Nav>
                <Nav.Link className="header-username">
                    <Link className="header-link" to="/dashboard/profile">
                        <Image className="profile-picture" src={profilePicture} roundedCircle /> {userName}
                    </Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header
