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

    const [graphData, setGraphData] = useState([
        {
            name: 'graph1',
            data: [{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 15 }, { x: 4, y: 12 }]
        },
        {
            name: 'graph2',
            data: [{ x: 1, y: 10 }, { x: 2, y: 4 }, { x: 3, y: 2 }, { x: 4, y: 15 }]
        },
        {
            name: 'graph3',
            data: [{ x: 1, y: 7 }, { x: 2, y: 11 }, { x: 3, y: 9 }, { x: 4, y: 2 }]
        }
       ]
    )

    //TODO: populate when we pull from the saved configs 
    const [graphNames, toggleOn] = React.useState([
        {
            name: "name1",
            toggleOn: false,
        },
        {
            name: "name2",
            toggleOn: false,
        },
        {
            name: "name3",
            toggleOn: false,
        },
    ]);

    const onCheck = () => {
        // setState({ ...state, [name]: event.target.checked }); //from CheckBox originally
        //if the graphData is already in the structure above
        //send it down to ProcessGraph to display it 
        //else
        //take the graph 
    }
    return (
        <>
            <NavBar />
            <Grid container className={classes.graph}>
                <Grid item xs={12} sm={9}>
                    <ProcessGraph graphData={graphData} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Checkbox onClick={onCheck} graphNames={graphNames} /> 
                    {/* pass the checkstate stuff in here */}
                </Grid>
            </Grid>
        </>
    );
}