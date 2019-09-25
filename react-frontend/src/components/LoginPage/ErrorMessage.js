// Library imports
import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({auth}) => {
  // Don't show if we are logged in
  if (auth.status) {
    return null;
  }

  // Don't show if we don't have an error message
  if (!auth.reason) {
    return null;
  }

  // Show Alert containing error from server
  return <Alert variant='danger'>{auth.reason}</Alert>;
};

export default ErrorMessage;
