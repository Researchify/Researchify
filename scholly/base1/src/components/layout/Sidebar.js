import React from 'react';
import {Nav} from 'react-bootstrap';
import './Sidebar.css'
import HeaderData from './HeaderData.js';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const headerData = HeaderData();
    return (
        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar me-auto"
                 activeKey="/home"
                 onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                {headerData.map((val) => {
                    return (
                        <Nav.Link as={Link} to={val.link}>
                            {val.title}
                        </Nav.Link>
                    );
                })}
            </Nav>

        </>

    )
}

export default Sidebar