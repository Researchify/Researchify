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
import Sidebar from './layout/Sidebar';

import Register from './auth/Register';
import Login from './auth/Login';
import Layout from './Layout';
import SidebarData from './layout/SidebarData'
import Header from './layout/Header';
import { Container, Col, Row } from 'react-bootstrap';

import './layout/Layout.css'
import PublicationPage from './publications/PublicationPage';
import { Fragment } from 'react';

const App = () => {
    const urls={
        dashboard: "/dashboard",
        profile: "/dashboard/profile",
        editor: "/editor",
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/editor" exact component={Editor}/>

                <Layout sidebarData={SidebarData} urls={urls}>
                    <Route path="/publications/team/:teamId" exact component={PublicationPage}/>
                    <Route path={urls.dashboard} exact component={Dashboard} />
                    <Route path="/dashboard/profile" exact component={ProfileInfoEdit} />
        
                </Layout>
                                      
            </Switch>             
        </BrowserRouter>
    );
};

export default App;
