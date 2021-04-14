/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';



const App = () => {
    return (
        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/dashboard/profile" exact component={ProfileInfoEdit} />

            </Switch>
        </BrowserRouter>
    );
};

/**
 * <Route path="/editprofile" exact component={ProfileInfoEdit} />
 */
export default App;
