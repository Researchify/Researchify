/**
 * a toaster component
 * @returns null if no notification, otherwise empty fragment.
 */

import React, { Fragment, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
export const NotificationToaster = () => {
  const { error, success } = useSelector((state) => state.notification);

  useEffect(() => {
    if(error){
      toast.error(error.data);
    }
  }, [error])

  useEffect(() => {
    if(success){
      toast.success(success);
    }
  }, [success])
  
  return <Fragment />;
};
