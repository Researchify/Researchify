/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import Publications from './publications/Publications';
import Publication from './publications/publication/Publication';


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/publications/team/:teamId" exact component={Publications}/>
                <Route path="/publications/:pubId"exact component={Publication}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
