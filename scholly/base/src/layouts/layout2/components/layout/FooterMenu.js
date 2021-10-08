import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const FooterMenu = ({ styles, menuItems }) => {
  const location = useLocation();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        height: styles.footerMenuHeight,
        backgroundColor: 'var(--researchify-color-quaternary)',
        position: 'fixed',
        bottom: 0,
        zIndex: 3,
        color: 'var(--researchify-text-color)',
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
          <Nav.Link
            style={{ color: location.pathname === item.path && 'var(--researchify-link-color' }}
            key={item.title}
            as={Link}
            to={item.path}
          >
            {styles.showFooterMenuText
              ? item.title
              : <span style={{ marginRight: 5, fontSize: 20 }}>{item.icon}</span>}
          </Nav.Link>
        </div>
      ))}
    </div>
  );
};

export default FooterMenu;
