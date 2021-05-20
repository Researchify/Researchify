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
    const urls={
        dashboard: "/dashboard",
        profile: "/dashboard/profile",
        editor: "/editor",
    }

    const headerData = [
        {
            title:"Profile",
            link: "/dashboard/profile"
        },
        {
            title:"Publications",
            link: "/publications/team/606bb59c22201f529db920c9"
        }      
    ]
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/editor" exact component={Editor}/>
                {console.log(headerData)}
                <Layout sidebarData={SidebarData} headerData={headerData}>
                    <Route path="/publications/team/:teamId" exact component={PublicationPage}/>
                    <Route path={urls.dashboard} exact component={Dashboard} />
                    <Route path="/dashboard/profile" exact component={ProfileInfoEdit} />
        
                </Layout>
            </Switch>             
        </BrowserRouter>
    );
};
export default App;
