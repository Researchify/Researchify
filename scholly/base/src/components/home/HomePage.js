import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
            Home Page
            <li><Link to="/publication">Publication</Link></li>
            <li><Link to="/team">Team</Link></li>
        </div>
    )
}

export default HomePage