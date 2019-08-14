import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import TimerIcon from '@material-ui/icons/Timer';

export default function QueuedButton() {

  return (
    <>
      <IconButton color="inherit" aria-label="close" disabled>
        <TimerIcon />
      </IconButton>
    </>
  );
}
