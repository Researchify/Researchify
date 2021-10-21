/*
 * This file stores the link data of side bar
 */
import React from 'react';
// icons
import {
  BsFillGridFill,
  BsBookHalf,
  BsPeople,
  BsFillAwardFill,
  BsCardText,
  BsColumns,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';

/*
    List of navigation inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const DashboardSidebarData = () => {
  const sidebarLinks = [
    {
      title: 'Dashboard',
      icon: <BsFillGridFill />,
      link: '/dashboard',
    },
    {
      title: 'Template Selector',
      icon: <BsColumns />,
      link: '/templates',
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
      title: 'Team Members',
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
