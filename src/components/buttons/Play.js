import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import ConfigTable from '../pages/ConfigTable';
import PlayIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

export default function PlayButton() {
  const classes = useStyles();
  function handlePlay(){
    alert("Running file")
  }

  return (
    <div className={classes.toolbarButtons}>
        <IconButton color="inherit" onClick={handlePlay} aria-label="close">
        <PlayIcon />
        </IconButton>
    </div>
  );
}
