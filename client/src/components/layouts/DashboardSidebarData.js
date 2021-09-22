/*
 * This file stores the link data of side bar
 */
import React from 'react';
// icons
import {
  BsFillGridFill,
  BsBookHalf,
  BsPerson,
  BsPeople,
  // BsFillQuestionCircleFill,
  BsBoxArrowLeft,
  BsFillAwardFill,
  BsCardText,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';

/*
    List of navigation inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const DashboardSidebarData = ({ setLogoutAlert }) => {
  const sidebarLinks = [
    {
      title: 'Dashboard',
      icon: <BsFillGridFill />,
      link: '/dashboard',
    },
    {
      title: 'Our Homepage',
      icon: <BsCardText />,
      link: '/about-us',
    },
    {
      title: 'Publications',
      icon: <BsBookHalf />,
      link: '/publications',
      name: 'PUBLICATIONS',
    },
    {
      title: 'Team Profile',
      icon: <BsPerson />,
      link: '/dashboard/profile',
    },
    {
      title: 'Team Member',
      icon: <BsPeople />,
      link: '/team',
      name: 'TEAM',
    },
    {
      title: 'Achievements',
      icon: <BsFillAwardFill />,
      link: '/achievement',
      name: 'ACHIEVEMENTS',
    },
    {
      title: 'Logout',
      icon: <BsBoxArrowLeft />,
      action: () => setLogoutAlert(true),
    },
  ];

  const pagesAdded = useSelector((state) => state.website.pages);

  // Only show client website related pages on the sidebar if they have been added by client
  // i.e. do not show PUBLICATIONS page if not added by client yet.
  const links = sidebarLinks.filter((pageInfo) => {
    if ('name' in pageInfo) {
      if (!pagesAdded.includes(pageInfo.name)) {
        return false;
      }
    }
    return true;
  });

  return links;
};

export default DashboardSidebarData;
