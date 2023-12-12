import React from "react";
import { Button } from "@mui/material";

function MyButton(props) {
  return (
    <Button
      variant={props.variant}
      color={props.color}
      onClick={() => props.onClick()}
    >
      {props.value}
    </Button>
  );
}
export default MyButton;
