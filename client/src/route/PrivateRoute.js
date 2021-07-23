import React from 'react';
import { Redirect, Route } from "react-router-dom";
  
const PrivateRoute = ({ signIn, authenticationPath, ...routeProps}) => {  
  if(!signIn) {
      return <Redirect to={{ pathname: authenticationPath }} />;
  } else {
    return <Route {...routeProps} />;
  }
};
export default PrivateRoute;