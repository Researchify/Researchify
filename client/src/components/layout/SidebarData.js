import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
export const SidebarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/dashboard"
    },
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/home"
    },
    {
        title: "Publications",
        icon: <LibraryBooksIcon />,
        link: "/publications"
    },
    {
        title: "APIs",
        icon: <VpnKeyIcon />,
        link: "/home"
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/home"
    },
    {
        title: "Help",
        icon: <HelpIcon />,
        link: "/home"
    },
]
