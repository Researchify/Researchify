/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';

import Register from './auth/Register';
import Login from './auth/Login';
import Header from './layout/Header'

import PublicationPage from './publications/PublicationPage';

const App = () => {
    return (

        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/publications/team" exact component={PublicationPage}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/dashboard/profile" exact component={ProfileInfoEdit} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
