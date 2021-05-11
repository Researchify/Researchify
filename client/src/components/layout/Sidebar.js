import { Navbar, Nav, Image } from "react-bootstrap"

import "./Sidebar.css"

function Sidebar() {
    return (
        <Nav className="sidebar flex-column"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item>
                <Nav.Link eventKey="button-1" className="sidebar-item">Dummy Button 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="button-2" className="sidebar-item">Dummy Button 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="button-3" className="sidebar-item">Dummy Button 3</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="setting" className="sidebar-item">Setting</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="help" className="sidebar-item">Help</Nav.Link>
            </Nav.Item>
            <Nav.Item className="sidebar-item">
                <Nav.Link eventKey="whatelse" className="sidebar-item">What else</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Sidebar