import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FooterMenu = ({ styles, menuItems }) => (

  <div
    style={{
      display: 'flex',
      alignItems: 'stretch',
      width: '100%',
      height: styles.footerMenuHeight,
      backgroundColor: '#DEE4E7',
      color: 'black',
      position: 'fixed',
      bottom: 0,
      zIndex: 3,
    }}
  >
    {menuItems.map((item, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Nav.Link key={item.title} as={Link} to={item.path}>
          {styles.showFooterMenuText
            ? item.title
            : <span style={{ marginRight: 5, fontSize: 20 }}>{item.icon}</span>}
        </Nav.Link>
      </div>
    ))}
  </div>
);

export default FooterMenu;
