import React from 'react'
import {BsFillGridFill, BsFillHouseDoorFill, BsBookHalf, BsPencilSquare,
    BsPerson, BsGearFill, BsFillQuestionCircleFill} from "react-icons/bs";

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const SidebarData = [
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
        title: "Editor",
        icon: <BsPencilSquare />,
        link: "/editor"
    },
    {
        title: "Publications",
        icon: <BsBookHalf />,
        link: "/publications/team"
    },
    {
        title: "Team Profile",
        icon: <BsPerson />,
        link: "/dashboard/profile"
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
export default SidebarData