import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';

export default function InProgressButton() {

  return (
    <>
      <IconButton color="inherit" aria-label="close" disabled>
        <CachedIcon />
      </IconButton>
    </>
  );
}
