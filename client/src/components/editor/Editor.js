import React from "react"
import EditorHome from './EditorHome'
import { Fragment } from "react"
import '../layout/Layout.css'
import Layout from '../layout/Layout';
import EditorSideBarData from './EditorSideBarData'

const headerData = [
    {
        title:"Publish Site",
        link: "#"
    },
    {
        title:"Visit Site",
        link: "#"
    }      
]
const editor =()=>{
    return(
// Add routes to other editor pages just like in App component
    //Need to have header and sidebar wrapped in a fragmment for other editor pages to use
    <Fragment>
        <Layout sidebarData={EditorSideBarData}>
            <EditorHome />
        </Layout>
    </Fragment>
)}


export default editor