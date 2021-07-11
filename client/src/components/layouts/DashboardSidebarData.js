/*
 * This file stores the link data of side bar
 */

import React from 'react';
import { useSelector } from 'react-redux';
// icons
import {
  BsFillGridFill,
  BsBookHalf,
  BsPencilSquare,
  BsPerson,
  BsGearFill,
  BsFillQuestionCircleFill,
} from 'react-icons/bs';

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const DashboardSidebarData = () => {
  const teamId = useSelector((state) => state.user.teamId);
  return [
    {
      title: 'Dashboard',
      icon: <BsFillGridFill />,
      link: '/dashboard',
    },
    {
      title: 'Editor',
      icon: <BsPencilSquare />,
      link: '/editor',
    },
    {
      title: 'Publications',
      icon: <BsBookHalf />,
      link: `/publications/team/${teamId}`,
    },
    {
      title: 'Account Management',
      icon: <BsPerson />,
      link: '/dashboard/profile',
    },
    {
      title: 'Settings',
      icon: <BsGearFill />,
      link: '/dashboard/settings',
    },
    {
      title: 'Help',
      icon: <BsFillQuestionCircleFill />,
      link: '/dashboard/help',
    },
  ];
};

export default DashboardSidebarData;
