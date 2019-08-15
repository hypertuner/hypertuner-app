import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ConfigTab from '../buttons/ConfigTab'
import {
  progressSocket,
  progressWatch,
  progressUnwatch
} from '../../api/actionSocket'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2)
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto'
  },
  pbutton: {
    textAlign: 'right'
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export function ConfigGrid({ transition }) {
  const classes = useStyles()

  const [processStatuses, setProcessStatuses] = useState({})
  const [progressWatchId, setProgressWatchId] = useState()

  useEffect(() => {
    const handleMessage = ({ data }) => {
      const jsonData = JSON.parse(data)

      if (!jsonData.success) return

      if (jsonData.type === 'progress-stop') {
        setProgressWatchId(null)
      }

      if (jsonData.type === 'progress-data') {
        setProcessStatuses(jsonData.processStatus)
        setProgressWatchId(jsonData.watchId)
      }
    }

    progressWatch()
    progressSocket.addEventListener('message', handleMessage)

    return () => {
      progressSocket.removeEventListener('message', handleMessage)
      if (progressWatchId) progressUnwatch(progressWatchId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   return () => {
  //     if (progressWatchId) progressUnwatch(progressWatchId)
  //   }
  // }, [progressWatchId])

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center">
        {Object.entries(processStatuses).map(([name, status]) => (
          <Grid key={name} item className={classes.grid}>
            <ConfigTab job={name} transition={transition} status={status} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
