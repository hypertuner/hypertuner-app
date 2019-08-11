import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Play from '../buttons/Play';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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
}));

export default function ConfigTab({job})  {
    const classes = useStyles();
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item alignItems="center" xs={9}> 
                        <Button>
                            <Typography className={classes.title}>{job}</Typography>
                        </Button>  
                    </Grid>
                    <Grid item alignItems="center" xs={3}> <Play className={classes.pbutton}/> </Grid>
                </Grid>
            </Paper>
        </>
    )
}