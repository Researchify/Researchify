import Container from "react-bootstrap/Container"

import Layout from '../layout/Layout'
import './Dashboard.css'


function PageContent() {
    return (
        <main>                
            <Container fluid>
                <div>There will be no content here as for now. Content to display need to be decided.</div>
            </Container>
        </main>
    )
}


function Dashboard() {
    return <Layout innerContent={<PageContent />} />
}

export default Dashboard
