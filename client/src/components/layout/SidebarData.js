import React from 'react'
import {BsFillGridFill, BsFillHouseDoorFill, BsBookHalf, BsInboxesFill, BsGearFill, BsFillQuestionCircleFill} from "react-icons/bs";

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
        link: "/home"
    },
    {
        title: "Publications",
        icon: <BsBookHalf />,
        link: "/publications"
    },
    {
        title: "APIs",
        icon: <BsInboxesFill />,
        link: "/home"
    },
    {
        title: "Settings",
        icon: <BsGearFill />,
        link: "/home"
    },
    {
        title: "Help",
        icon: <BsFillQuestionCircleFill />,
        link: "/home"
    },
]
