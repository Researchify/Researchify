import { Link } from 'react-router-dom'
import {REPO_URL} from '../../global/data';

const HomePage = () => {
    return (
        <div>
            <h2> Home Page!!!!! </h2>
            <h2> {REPO_URL} </h2>
            <li><Link to="/publication">Publication</Link></li>
            <li><Link to="/team">Team</Link></li>
        </div>
    )
}

export default HomePage