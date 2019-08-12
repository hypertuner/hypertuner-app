import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../navigation/NavBar';
import Checkbox from '../objects/Checkbox'
import { ProcessGraph } from '../objects/ProcessGraph';

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

    const [graphData, setGraphData] = useState(
        [{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 15 }, { x: 4, y: 12 }],
        [{ x: 1, y: 10 }, { x: 2, y: 4 }, { x: 3, y: 2 }, { x: 4, y: 15 }],
        [{ x: 1, y: 7 }, { x: 2, y: 11 }, { x: 3, y: 9 }, { x: 4, y: 2 }]
    )

    const onCheck = () => {
        console.log('fuck u lol')
    }
    return (
        <>
            <NavBar />
            <Grid container className={classes.graph}>
                <Grid item xs={12} sm={9}>
                    <ProcessGraph graphData={graphData} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Checkbox onClick={onCheck} />
                </Grid>
            </Grid>
        </>
    );
}