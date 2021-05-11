import Container from "react-bootstrap/Container"

import Layout from '../layout/Layout'
import './Dashboard.css'


function PageContent() {
    return (
        <main>                
            <Container fluid>
                <p>This will be a super long text
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>
                    to test scroll bar</p>
            </Container>
        </main>
    )
}


function Dashboard() {
    return <Layout innerContent={<PageContent />} />
}

export default Dashboard
