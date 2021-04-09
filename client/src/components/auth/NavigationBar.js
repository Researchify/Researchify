/**
 * This file exports a Navigation Bar component used to display a navigation bar on top of pages.
 */

 import React from 'react';
 import Navbar from 'react-bootstrap/Navbar';

class NavigationBar extends React.Component {
    render() {
        return(
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">
                    <h2>Researchify</h2>
                </Navbar.Brand>
            </Navbar>
        );
    }
}

 export default NavigationBar;