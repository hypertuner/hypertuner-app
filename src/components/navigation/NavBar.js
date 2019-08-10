import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  toolbarButtons: {
    // margin: theme.spacing(1.5),
    marginLeft: "auto",
    marginRight: -15
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit">
            HyperTuner
          </Typography>
          <span className={classes.toolbarButtons}>
            <Button className={classes.button} color="inherit">Configs</Button>
            <Button className={classes.button} color="inherit">Graph</Button>
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
}
