import React from "react"
import { Navbar, Nav, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'
<<<<<<< HEAD

import "./Header.css"

import profilePicture from "./user.png"

/**
 * This functio provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
function Header() {
=======
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
>>>>>>> main
    return (
        <Navbar bg="primary" variant="dark" className="header">
            <Navbar.Brand><Link className="header-brand" to="/dashboard">Researchify</Link></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link><Link className="header-link" to="/dashboard/profile">Profile</Link></Nav.Link>
<<<<<<< HEAD
                <Nav.Link><Link className="header-link" to="/publications/team/:teamId">Publication Team</Link></Nav.Link>
                <Nav.Link><Link className="header-link" to="/publications/:pubId">Publications</Link></Nav.Link>
=======
                <Nav.Link><Link className="header-link" to="/publications/team/606bb59c22201f529db920c9">Publication Team</Link></Nav.Link>
                <Nav.Link><Link className="header-link" to="/publications/606e88366a6daf816da6ace5">Publications</Link></Nav.Link>
>>>>>>> main
            </Nav>
            <Nav>
                <Nav.Link className="header-username">
                    <Link className="header-link" to="/dashboard/profile">
<<<<<<< HEAD
                        <Image className="profile-picture" src={profilePicture} roundedCircle /> Username
=======
                        <Image className="profile-picture" src={profilePicture} roundedCircle /> {userName}
>>>>>>> main
                    </Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header
