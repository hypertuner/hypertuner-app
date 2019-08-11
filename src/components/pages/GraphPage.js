import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../navigation/NavBar';
import Checkbox from '../buttons/Checkbox'
import ProcessGraph from './ProcessGraph';

const useStyles = makeStyles(theme => ({
    graph: {
        height: "90%"
    },
    gridCon: {
        height: "100%"
    }
}));

export default function GraphPage() {
    const classes = useStyles();
    return (
        <>
            <NavBar />
            <Grid container className={classes.graph}>
                <Grid item xs={12} sm={9}>
                    <ProcessGraph />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Checkbox />
                </Grid>
            </Grid>
        </>
    );
}