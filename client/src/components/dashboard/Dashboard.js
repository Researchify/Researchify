import Container from "react-bootstrap/Container"

import PageCard from "./PageCard"
import Layout from '../layout/Layout'
import './Dashboard.css'


function PageContent() {
    return (
        <main>                
            <Container fluid>
                {PageCard("Page 1","Description of Page 1.....")}
                {PageCard("Biology Research", "What happens if one doesn't sleep...")}
            </Container>
        </main>
    )
}


function Dashboard() {
    return Layout(PageContent)
}

export default Dashboard
