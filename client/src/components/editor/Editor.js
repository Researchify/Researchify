import React from "react"
import EditorHome from './EditorHome'
import { Fragment } from "react"
import '../layout/Layout.css'
import Layout from '../Layout';
import EditorSideBarData from './EditorSideBarData'

const urls={
    dashboard: "/dashboard",
    profile: "/dashboard/profile",
    editor:"/editor"
}

const editor =()=>{
    return(
// Add routes to other editor pages just like in App component
    //Need to have header and sidebar wrapped in a fragmment for other editor pages to use
    <Fragment>
        <Layout sidebarData={EditorSideBarData} urls={urls}>
            <EditorHome />
        </Layout>
    </Fragment>
)}


export default editor