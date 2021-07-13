import React, { Fragment } from 'react';
import toast from 'react-hot-toast';

/**
 * a toaster component
 * @param {string} message error response message from the server
 * @returns null if no error message, otherwise empty fragment.
 */
export const ErrorToaster = ({ message }) => {
  if (!message) {
    return null;
  }
  toast.error(message.data);
  return <Fragment />;
};
