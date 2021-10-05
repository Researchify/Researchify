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

  // Responsible for setting a limit to the number of toasts that can be stacked at any point of time.
  // See :https://github.com/timolins/react-hot-toast/issues/31#issuecomment-803359550
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <NotificationToaster />
        { logIn ? <PrivateRoute /> : <PublicRoute /> }
      </BrowserRouter>
    </>
  );
};

export default App;
