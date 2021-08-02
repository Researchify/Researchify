import React, { Fragment, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
/**
 * a toaster component
 * @param {string} message error response message from the server
 * @returns null if no error message, otherwise empty fragment.
 */
export const ErrorToaster = () => {
  const { error, success } = useSelector((state) => state.main);

  useEffect(() => {
    if(error){
      toast.error(error.data);
    }
  }, [error])

  useEffect(() => {
    if(success){
      toast.success(success.data);
    }
  }, [success])
  
  return <Fragment />;
};
