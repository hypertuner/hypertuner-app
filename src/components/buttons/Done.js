import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

export default function DoneButton() {

  return (
    <>
      <IconButton color="inherit" aria-label="close" disabled>
        <DoneIcon />
      </IconButton>
    </>
  );
}
