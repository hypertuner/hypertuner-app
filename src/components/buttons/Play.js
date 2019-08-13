import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { serverHost } from '../../api/config';

export default function PlayButton({name}) {

  async function handlePlay() {
    
    const resultResponse = await fetch(`${serverHost}/run-config`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name})
    });

    const result = await resultResponse.json();
    if (result.success) {
      alert("It's alive!!!");
    } else {
      alert("Process failed");
    }
  }

  return (
    <>
      <IconButton color="inherit" onClick={handlePlay} aria-label="close">
        <PlayIcon />
      </IconButton>
    </>
  );
}