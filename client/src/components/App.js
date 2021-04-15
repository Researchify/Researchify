/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';
import Publications from './publications/Publications';
import Publication from './publications/publication/Publication';



const App = () => {
    return (
        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/dashboard/profile" exact component={ProfileInfoEdit} />
                <Route path="/publications/team/:teamId" exact component={Publications}/>
                <Route path="/publications/:pubId"exact component={Publication}/>
            </Switch>
        </BrowserRouter>
    );
};

/**
 * <Route path="/editprofile" exact component={ProfileInfoEdit} />
 */
export default App;
