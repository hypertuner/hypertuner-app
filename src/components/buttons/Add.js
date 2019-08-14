import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import AddConfig from '../pages/AddConfig'

const useStyles = makeStyles(() => ({
  addPos: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}))

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

export default function AddButton({ transition }) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  function handleClick() {
    setOpen(true)
  }

  return (
    <>
      <Fab
        onClick={handleClick}
        color="primary"
        aria-label="add"
        className={classes.addPos}>
        <AddIcon />
      </Fab>
      <AddConfig
        transition={transition}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
