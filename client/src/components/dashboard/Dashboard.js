import Container from "react-bootstrap/Container"
import {useSelector} from 'react-redux';
import './Dashboard.css'


const Dashboard = () => {
    const userName = useSelector(state => {console.log(state); return state.team?.teamName});
    return (
        <main>                
            <Container fluid>
                You are currently viewing dashboard page. Team name: {userName}
            </Container>
        </main>
    )
}

export default Dashboard
