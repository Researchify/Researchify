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
  BsGearFill,
  BsFillQuestionCircleFill,
  BsUpload,
  BsBoxArrowLeft,
} from 'react-icons/bs';
import { DISPLAY_LOG_OUT_ALERT } from '../../actions/types';
import { useDispatch, useSelector } from 'react-redux';

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const DashboardSidebarData = () => {
  const dispatch = useDispatch();
  const sidebarLinks = [
    {
      title: 'Dashboard',
      icon: <BsFillGridFill />,
      link: '/dashboard',
    },
    {
      title: 'Publications',
      icon: <BsBookHalf />,
      link: `/publications`,
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
      action: () => dispatch({type: DISPLAY_LOG_OUT_ALERT}),
    },
  ];

  const pagesAdded = useSelector((state) => state.website.pages);

  // Only show client website related pages on the sidebar if they have been added by client
  // i.e. do not show PUBLICATIONS page if not added by client yet.
  const links = sidebarLinks.filter((pageInfo) => {
    if ('name' in pageInfo) {
      if (!pagesAdded.includes(pageInfo['name'])) {
        return false;
      }
    }
    return true;
  });

  return links;
};

export default DashboardSidebarData;
