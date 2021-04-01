/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
