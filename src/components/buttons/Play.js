import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';

export default function PlayButton() {

  function handlePlay(){
    alert("Running file")
  }

  return (
    <>
        <IconButton color="inherit" onClick={handlePlay} aria-label="close">
          <PlayIcon />
        </IconButton>
    </>
  );
}
