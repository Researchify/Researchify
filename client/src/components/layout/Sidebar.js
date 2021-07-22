import React from 'react';
import './Sidebar.css';
import { SidebarData } from './SidebarData';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  let location = useLocation();

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData().map((val, key) => {
          return (
            <Link to={val.link}>
              <li
                key={key}
                className="row"
                id={location.pathname === val.link ? 'active' : ''}
                onClick={val.action}
              >
                {/* Sets sidebar navigation to active (blue) if the current page is the same in sidebar*/}

                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
