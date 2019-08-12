import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  // toolbarButtons: {
  //   marginLeft: 'auto',
  // },
}));

export default function SaveButton({handleSave, state}) {
  const classes = useStyles();
  return (
    <div className={classes.toolbarButtons}>
        <IconButton color="inherit" onClick={handleSave} aria-label="close">
          <SaveIcon />
        </IconButton>
    </div>
  );
}
