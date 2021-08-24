/**
 * This file export all the public route
 */

 import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import LandingPage from '../landing-pages/LandingPage';
import Login from '../auth/Login';
import Register from '../auth/Register';

const PublicRoute = () => (
    <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        {/*  If not login, any other route not stated above will be redirect home page */} 
        <Redirect to="/"/>
    </Switch> 
)

  export default PublicRoute