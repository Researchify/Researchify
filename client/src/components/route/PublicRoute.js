/**
 * Root component.
 */
 import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import Home from '../home/Home'; 
import Login from '../auth/Login';
import Register from '../auth/Register';

const PublicRoute = () => {
return (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} /> 
        <Redirect to="/"/>
    </Switch> 
)
}

  export default PublicRoute