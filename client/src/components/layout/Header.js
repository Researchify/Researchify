import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Image from "react-bootstrap/Image"

import "./Header.css"

import profilePciture from "./user.png"


function Header() {
    return (
        <Navbar bg="primary" variant="dark" className="header">
            <Navbar.Brand href="/dashboard">Researchify</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/dashboard/profile">Profile</Nav.Link>
                <Nav.Link href="/publications/team/:teamId">Publication Team</Nav.Link>
                <Nav.Link href="/publications/:pubId">Publications</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/dashboard/profile" className="header-username"><Image className="profile-picture" src={profilePciture} roundedCircle /> Username</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Header