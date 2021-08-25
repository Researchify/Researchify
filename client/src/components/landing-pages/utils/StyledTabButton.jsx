import React from "react";
import styled from "styled-components";
import Tab from "@material-ui/core/Tab";
import { theme as colour } from "../theme";

const StyledTab = styled(({ ...props }) => (
  <Tab {...props} classes={{ selected: "selected" }} />
))`
  &.selected {
    color: white;
    background-color: ${colour.secondary};
  }
`;

const StyledComponentsTab = (props) => {
  return (
    <>
      <StyledTab {...props} />
    </>
  );
};

export default StyledComponentsTab;
