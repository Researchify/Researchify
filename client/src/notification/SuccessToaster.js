import React, { Fragment, useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * a toaster component
 * @param {string} message error response message from the server
 * @returns null if no error message, otherwise empty fragment.
 */
export const SuccessToaster = ({ message }) => {
  useEffect(() => {
    if(message){
      toast.success(message.data);
    }
  }, [message])
  return <Fragment />;
};
