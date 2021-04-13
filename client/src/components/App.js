/**
 * Root component.
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';


const App = () => {
    return (
        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path="/editprofile" exact component={ProfileInfoEdit} />
            </Switch>
        </BrowserRouter>
    );
};

/**
 * <Route path="/editprofile" exact component={ProfileInfoEdit} />
 */
export default App;
