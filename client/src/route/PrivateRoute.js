import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom";

  
const PrivateRoute = ({ signIn, authenticationPath, ...routeProps}) => {    
    if(!signIn) {
      return <Redirect to={{ pathname: authenticationPath }} />;
    } else {
      return <Route {...routeProps} />;
    }
  };
export default PrivateRoute;