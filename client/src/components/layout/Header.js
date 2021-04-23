import React from "react"
import { Navbar, Nav, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'

import "./Header.css"

import profilePicture from "./user.png"

/**
 * This functio provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
function Header() {
    return (
        <Navbar bg="primary" variant="dark" className="header">
            <Navbar.Brand><Link className="header-brand" to="/dashboard">Researchify</Link></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link><Link className="header-link" to="/dashboard/profile">Profile</Link></Nav.Link>
                <Nav.Link><Link className="header-link" to="/publications/team/:teamId">Publication Team</Link></Nav.Link>
                <Nav.Link><Link className="header-link" to="/publications/:pubId">Publications</Link></Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link className="header-username">
                    <Link className="header-link" to="/dashboard/profile">
                        <Image className="profile-picture" src={profilePicture} roundedCircle /> Username
                    </Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header
