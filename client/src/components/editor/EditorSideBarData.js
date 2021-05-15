import React from 'react'
import {BsFillGridFill, BsFillHouseDoorFill, BsBookHalf, 
    BsFileEarmarkPlus,BsFillAwardFill,BsGearFill, BsFillQuestionCircleFill} from "react-icons/bs";

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const EditorSideBarData = [
    {
        title: "Publications Page",
        icon: <BsFillGridFill />,
        link: "/publications"
    },
    {
        title: "Home Page",
        icon: <BsFillHouseDoorFill />,
        link: "/home"
    },
    {
        title: "Awards Page",
        icon: <BsFillAwardFill />,
        link: "/home"
    },
    {
        title: "Add Page",
        icon: <BsFileEarmarkPlus />,
        link: "/custompage"
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
export default EditorSideBarData