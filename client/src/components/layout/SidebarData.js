import React from 'react'
import {BsFillGridFill, BsFillHouseDoorFill, BsBookHalf, 
    BsPerson, BsGearFill, BsFillQuestionCircleFill, BsPeople} from "react-icons/bs";

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
export const SidebarData = [
    {
        title: "Dashboard",
        icon: <BsFillGridFill />,
        link: "/dashboard"
    },
    {
        title: "Home",
        icon: <BsFillHouseDoorFill />,
        link: "/dashboard/home"
    },
    {
        title: "Publications",
        icon: <BsBookHalf />,
        link: "/publications"
    },
    {
        title: "Team Profile",
        icon: <BsPerson />,
        link: "/dashboard/profile"
    },
    {
        title: "Team Member",
        icon: <BsPeople />,
        link: "/team"
    },
    {
        title: "Settings",
        icon: <BsGearFill />,
        link: "/dashboard/settings"
    },
    {
        title: "Help",
        icon: <BsFillQuestionCircleFill />,
        link: "/dashboard/help"
    },
]