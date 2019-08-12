import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    borderLeft: "1px solid gray",
    height: "95%"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

export function CheckBoxGroup({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Model Configurations</FormLabel>
        <FormGroup>{children}</FormGroup>
        <FormHelperText>Choose configurations to display</FormHelperText>
      </FormControl>
    </div>
  );
}
