import Container from "react-bootstrap/Container"

import PageCard from "./PageCard"
import Layout from '../layout/Layout'
import './Dashboard.css'


function PageContent() {
    return (
        <main>                
            <Container fluid>
                <PageCard pageTitle="Page 1" pageDesc="Description of Page 1....."/>
                <PageCard pageTitle="Biology Research" pageDesc="How long can software engineers stay awake for..."/>
            </Container>
        </main>
    )
}


function Dashboard() {
    return <Layout innerContent={<PageContent />} />
}

export default Dashboard
