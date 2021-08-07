/*
 * This file stores the link data of side bar
 */
import React from 'react';
import {
  BsFillGridFill,
  BsBookHalf,
  BsPeople,
} from 'react-icons/bs';

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const SidebarData = () => {
  return [
    {
      title: 'Home',
      icon: <BsFillGridFill />,
      link: '/',
    },
    {
      title: 'Publications',
      icon: <BsBookHalf />,
      link: '/publication',
    },
    {
      title: 'Team Member',
      icon: <BsPeople />,
      link: '/team',
    }
  ];
};

export default SidebarData;
