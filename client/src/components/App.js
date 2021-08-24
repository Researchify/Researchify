/**
 * Root component.
 */
import React, { useEffect, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationToaster } from '../notification/NotificationToaster';

// Pages
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';

// Function
import { authorizeJWT } from '../actions/auth';

const App = () => {
  const { logIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(logIn){
      dispatch(authorizeJWT())
    }
  }, [dispatch, logIn]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
      <NotificationToaster/>
        { logIn ? <PrivateRoute /> : <PublicRoute /> }
      </BrowserRouter>
    </>
  );
};

export default App;
