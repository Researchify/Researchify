/**
 * This file exports the button of "Create a new website" in dashboard
 */
import React from 'react';
import { Button } from 'react-bootstrap';

/**
 * Button component, rendered if the website is not created yet
 */
const CreateWebsiteButton = (props) => {
  if (!props.websiteIsCreated) {
    return (
    <Button onClick={props.clickFunction}> Build a new Website </Button>
    );
  }
  return null;
};

export default CreateWebsiteButton;
