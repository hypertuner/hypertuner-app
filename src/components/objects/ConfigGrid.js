import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ConfigTab from '../buttons/ConfigTab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin : 'auto'
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
    // marginBottom: theme.spacing(2),
    // marginTop: theme.spacing(3)
  }
}));

export default function FullWidthGrid({transition, configList, setConfigList}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" spacing={3}>
        {
          configList.map(config =>
            <Grid item className={classes.grid}>
              <ConfigTab job={config} transition={transition} configList={configList} setConfigList={setConfigList} />
            </Grid>
          )
        }
      </Grid>
    </div>
  );
}
