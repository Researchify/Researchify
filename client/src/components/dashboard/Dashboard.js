/**
 * This component displays enough information for researchers to get a glimpse of their team website.
 */
import Container from "react-bootstrap/Container"

import PublishSiteModal from "../publish/PublishSiteModal";
import './Dashboard.css'


const Dashboard = () => {
    return (
        <main>
            <PublishSiteModal/>
            <Container fluid>
                You are currently viewing dashboard page.
            </Container>
        </main>
    )
}

export default Dashboard
