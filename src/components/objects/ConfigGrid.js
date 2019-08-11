import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Play from '../buttons/Play';
import Typography from '@material-ui/core/Typography';
import ConfigTab from '../buttons/ConfigTab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin : 'auto',
  },
  title: {
    // textAlign: 'left',
    // margin: 'auto'
  },
  pbutton: {
    textAlign: 'right'
  },
  grid: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(3)
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  const jobList = ["jobnumber1", "jobnumber2", "jobnumber3"];

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" spacing={3}>
        {
          jobList.map(job =>
            <Grid item className={classes.grid}>
              <ConfigTab job={job}/>
            </Grid>
          )
        }
      </Grid>
    </div>
  );
}
