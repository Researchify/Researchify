import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom";
import { authorizeJWT } from '../actions/auth';
  
const PrivateRoute = ({ signIn, authenticationPath, ...routeProps}) => {  
  const dispatch = useDispatch()
  
  if(!signIn) {
      return <Redirect to={{ pathname: authenticationPath }} />;
  } else {
    return <Route {...routeProps} />;
  }
  
  };
export default PrivateRoute;