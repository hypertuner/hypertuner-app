import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { runConfig } from '../../api/rest';

export default function PlayButton({name}) {

  async function handlePlay() {
    await runConfig(name)
  }

  return (
    <>
      <IconButton color="inherit" onClick={handlePlay} aria-label="close">
        <PlayIcon />
      </IconButton>
    </>
  );
}