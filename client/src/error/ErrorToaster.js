import React, { Fragment } from 'react';
import toast from 'react-hot-toast';

export const ErrorToaster = ({ message }) => {
  if (!message) {
    return null;
  }
  toast.error(message.data);
  return <Fragment />;
};
