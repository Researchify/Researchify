import React from 'react'
import {BsFillHouseDoorFill, BsBookHalf, BsFillPeopleFill,
    BsFileEarmarkPlus,BsFillAwardFill, BsArrowReturnLeft} from "react-icons/bs";

/*
    List of navigations inside the sidebar. Change the link to Nav.Link either here or in Sidebar.js.
*/
const EditorSidebarData = [
    {
        title: "Home Page",
        icon: <BsFillHouseDoorFill />,
        link: "/editor"
    },
    {
        title: "Publications Page",
        icon: <BsBookHalf />,
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
        title: "Back To Dashboard",
        icon: <BsArrowReturnLeft />,
        link: "/dashboard"
    }
]
export default EditorSidebarData
