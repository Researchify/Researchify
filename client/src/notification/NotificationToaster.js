/**
 * a toaster component
 * @returns null if no notification, otherwise empty fragment.
 */

import React, { Fragment, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_NOTIFICATION } from '../actions/types';
export const NotificationToaster = () => {
  const { error, success } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error.data);
    }
    if (success) {
      toast.success(success);
    }
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
  }, [error, success]);

  return <Fragment />;
};
