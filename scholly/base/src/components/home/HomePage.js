/**
 * Homepage component, to be discussed what should be inside this page 
 */
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
            <h2> Home Page </h2>
            <li><Link to="/publication">Publication</Link></li>
            <li><Link to="/team">Team</Link></li>
        </div>
    )
}

export default HomePage