import React from 'react'
import {BsFillHouseDoorFill, BsBookHalf, BsFillPeopleFill,
    BsFileEarmarkPlus,BsFillAwardFill,BsGearFill, BsFillQuestionCircleFill} from "react-icons/bs";

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const EditorSideBarData = [
    {
        title: "Publications Page",
        icon: <BsBookHalf />,
        link: "#"
    },
    {
        title: "Home Page",
        icon: <BsFillHouseDoorFill />,
        link: "#"
    },
    {
        title: "Awards Page",
        icon: <BsFillAwardFill />,
        link: "#"
    },
    {
        title: "Teams Page",
        icon: <BsFillPeopleFill />,
        link: "#"
    },
    {
        title: "Add Page",
        icon: <BsFileEarmarkPlus />,
        link: "#"
    },
    {
        title: "Settings",
        icon: <BsGearFill />,
        link: "#"
    },
    {
        title: "Help",
        icon: <BsFillQuestionCircleFill />,
        link: "#"
    },
]
export default EditorSideBarData