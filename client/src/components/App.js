/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import Dashborad from './dashboard/Dashboard';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/dashboard" exact component={Dashborad}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
