import React from 'react';
import {
  BsFillGridFill,
  BsFillHouseDoorFill,
  BsBookHalf,
  BsPerson,
  BsGearFill,
  BsPeople,
  BsFillQuestionCircleFill,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
export const SidebarData = () => {
  const teamId = useSelector((state) => state.user.teamId);
  return [
    {
      title: 'Dashboard',
      icon: <BsFillGridFill />,
      link: '/dashboard',
    },
    {
      title: 'Home',
      icon: <BsFillHouseDoorFill />,
      link: '/dashboard/home',
    },
    {
      title: 'Publications',
      icon: <BsBookHalf />,
      link: `/publications/team/${teamId}`,
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
