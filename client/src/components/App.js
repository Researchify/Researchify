/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import Register from './register/Register';
import Login from './login/Login';
import Dashboard from './dashboard';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/dashboard" exact component={Dashboard}/>

            </Switch>
        </BrowserRouter>
    );
};

export default App;
