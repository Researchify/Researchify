/**
 * Root component.
 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './auth/Auth';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';
import Editor from './editor/Editor'

import Register from './auth/Register';
import Login from './auth/Login';
import Layout from './layout/Layout';
import SidebarData from './layout/SidebarData'

import './layout/Layout.css'
import PublicationPage from './publications/PublicationPage';

const App = () => {
    
    const headerData = {
        title: "Researchify",
        dashboardURL: "/dashboard",
        profileURL: "/dashboard/profile"
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/editor" exact component={Editor}/>
                
                <Layout sidebarData={SidebarData} headerData={headerData} >
                    <Route path="/publications/team" exact component={PublicationPage}/>
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/dashboard/profile" exact component={ProfileInfoEdit} />
                </Layout>

            </Switch>             
        </BrowserRouter>
    );
};
export default App;
