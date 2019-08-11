import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  // toolbarButtons: {
  //   marginLeft: 'auto',
  // },
}));

export default function PlayButton() {
  const classes = useStyles();

  function handlePlay(){
    alert("Running file")
  }

  return (
    <div className={classes.toolbarButtons}>
        <IconButton color="inherit" onClick={handlePlay} aria-label="close">
          <SaveIcon />
        </IconButton>
    </div>
  );
}
