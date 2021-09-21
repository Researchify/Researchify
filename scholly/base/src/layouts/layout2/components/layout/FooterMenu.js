import React from 'react';
import { Link } from 'react-router-dom';
import getRoutes from '../router/routes';

const FooterMenu = ({ styles }) => {
  const headerData = getRoutes();
  return (

    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        height: styles.footerMenuHeight,
        backgroundColor: 'lightgrey',
        color: '#fff',
        position: 'fixed',
        bottom: 0,
      }}
    >
      {headerData.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Link key={item.title} to={item.path}>
            <span style={{ marginRight: 5, fontSize: 20 }}>{item.icon}</span>
            {styles.showFooterMenuText && item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FooterMenu;
