/**
 * Root component.
 */
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import NotificationToaster from '../notification/NotificationToaster';

// Pages
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';

// Function
import { authorizeJWT } from '../actions/auth';

const App = () => {
  const { logIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toasts } = useToasterStore();
  useEffect(() => {
    if (logIn) {
      dispatch(authorizeJWT());
    }
  }, [dispatch, logIn]);

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 1) // Is toast index over limit 2
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <NotificationToaster />
        { logIn ? <PrivateRoute /> : <PublicRoute /> }
      </BrowserRouter>
    </>
  );
};

export default App;
