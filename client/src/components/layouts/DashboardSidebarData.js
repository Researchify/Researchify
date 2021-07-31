/*
 * This file stores the link data of side bar
 */
import React from 'react';
// icons
import {
  BsFillGridFill,
  BsBookHalf,
  BsPencilSquare,
  BsPerson,
  BsPeople,
  BsGearFill,
  BsFillQuestionCircleFill,
  BsUpload,
  BsBoxArrowLeft,
} from 'react-icons/bs';
import { signOut } from '../../actions/auth';
import { useDispatch } from 'react-redux';


/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const DashboardSidebarData = () => {
  const dispatch = useDispatch();
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
      link: '/publications',
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
      title: 'Deploy Website',
      icon: <BsUpload />,
      link: '/deploy',
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
    {
      title: 'Logout',
      icon: <BsBoxArrowLeft />,
      link: '/',
      action: () => dispatch(signOut())
    }
  ];
};

export default DashboardSidebarData;
