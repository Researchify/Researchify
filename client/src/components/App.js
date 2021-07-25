/**
 * Root component.
 */
import React, { useEffect, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorToaster } from '../error/ErrorToaster';

// Pages
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';

// Function
import { authorizeJWT } from '../actions/auth';

const App = () => {
  const errorMessage = useSelector((state) => state.main.error);
  const { signIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(signIn){
      dispatch(authorizeJWT())
    }
  }, [dispatch, signIn]);

  return (
    <Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <ErrorToaster message={errorMessage} />
          { signIn ? <PrivateRoute /> : <PublicRoute /> }
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
