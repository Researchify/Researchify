/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import Register from './register/Register';
import Login from './login/Login';
<<<<<<< HEAD
import Publications from './publications/Publications';
import Publication from './publications/publication/Publication';
=======
import Dashboard from './dashboard';
>>>>>>> thunder

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
<<<<<<< HEAD
                <Route path="/publications/team/:teamId" exact component={Publications}/>
                <Route path="/publications/:pubId"exact component={Publication}/>
=======
                <Route path="/dashboard" exact component={Dashboard}/>

>>>>>>> thunder
            </Switch>
        </BrowserRouter>
    );
};

export default App;
