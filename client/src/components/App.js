/**
 * Root component.
 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/** Pages **/
import Home from './home/Home';
import Auth from './auth/Auth';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';
import PublicationPage from './publications/PublicationPage';
import EditorHome from './editor/EditorHome';

import './layouts/Layout.css';

/** Layout **/
import DashboardLayoutRoute from './layouts/dashboardLayout/DashboardLayoutRoute';
import EditorLayoutRoute from './layouts/editorLayout/EditorLayoutRoute';

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />

                <DashboardLayoutRoute path="/dashboard" exact component={Dashboard} />
                <DashboardLayoutRoute path="/dashboard/profile" exact component={ProfileInfoEdit} />
                <DashboardLayoutRoute path="/publications/team" exact component={PublicationPage} />

                <EditorLayoutRoute path="/editor" exact component={EditorHome} />

            </Switch>
        </BrowserRouter>
    );
};
export default App;
