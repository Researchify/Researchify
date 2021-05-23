/**
 * Root component.
 */
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Auth from "./auth/Auth";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";
import ProfileInfoEdit from "./profileInfoEdit/ProfileInfoEdit";

import Register from "./auth/Register";
import Login from "./auth/Login";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import { Container, Col, Row } from "react-bootstrap";

import "./layout/Layout.css";

import PublicationPage from "./publications/PublicationPage";
import { Fragment } from "react";

const App = () => {
  const urls = {
    dashboard: "/dashboard",
    profile: "/dashboard/profile",
  };
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Fragment>
            <Header title={"Researchify"} urls={urls} />
            <Container fluid>
              <Row>
                <Col className="sidebar-wrapper" md={2} lg={2} xl={1}>
                  <Sidebar />
                </Col>
                <Col className="page-content-wrapper" md={10} lg={10} xl={11}>
                  <Route
                    path="/publications/team"
                    exact
                    component={PublicationPage}
                  />
                  <Route path={urls.dashboard} exact component={Dashboard} />
                  <Route
                    path="/dashboard/profile"
                    exact
                    component={ProfileInfoEdit}
                  />
                </Col>
              </Row>
            </Container>
          </Fragment>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
