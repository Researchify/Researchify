/**
 * This file exports Sidebar component for layouts
 */
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Sidebar = ({ data }) => {
  const location = useLocation();

  return (
    <>
      <ul className="SidebarList">
        {data.map((val) => (
          // if the link property of a sidebar item is undefined, stays in the current page
          <Link to={val.link ? val.link : '#'} key={val.link}>
            <li
              className="row"
              id={location.pathname === val.link ? 'active' : ''}
              onClick={val.action}
            >
              {/* Sets sidebar navigation to active (blue) if the current page is the same in sidebar */}

              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

Sidebar.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Sidebar;
