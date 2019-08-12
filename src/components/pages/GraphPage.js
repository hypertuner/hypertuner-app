import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../navigation/NavBar";
import { CheckBoxGroup } from "../objects/Checkbox";
import { ProcessGraph } from "../objects/ProcessGraph";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  graph: {
    height: "90%"
  },
  gridCon: {
    height: "100%"
  },
  graphContainer: {
    padding: "5%",
    width: "90%",
    height: "90%"
  }
}));

export default function GraphPage() {
  const classes = useStyles();

  const [graphData, setGraphData] = useState([
    {
      name: "mrFig",
      data: [{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 15 }, { x: 4, y: 12 }]
    },
    {
      name: "name2",
      data: [{ x: 1, y: 10 }, { x: 2, y: 4 }, { x: 3, y: 2 }, { x: 4, y: 15 }]
    },
    {
      name: "graph3",
      data: [{ x: 1, y: 7 }, { x: 2, y: 11 }, { x: 3, y: 9 }, { x: 4, y: 2 }]
    }
  ]);

  //map function: you take something and for everything you do something
  //filter function: check everything you need against it and filter out what you don't need

  //TODO: populate when we pull from the saved configs
  const [graphNameMap, setGraphNameMap] = useState({
    mrFig: false,
    name2: false,
    graph3: true
  });

  const onCheck = name => event => {
    setGraphNameMap({
      ...graphNameMap,
      [name]: event.target.checked
    });
  };

  return (
    <>
      <NavBar />
      <Grid container className={classes.graph}>
        <Grid item xs={12} sm={9}>
          <div className={classes.graphContainer}>
            <ProcessGraph
              graphData={graphData.filter(g => graphNameMap[g.name])}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CheckBoxGroup>
            {Object.entries(graphNameMap).map(([name, toggleOn]) => (
              <FormControlLabel
                control={
                  <Checkbox checked={toggleOn} onChange={onCheck(name)} />
                }
                label={name}
              />
            ))}
          </CheckBoxGroup>
          {/* <Checkbox onCheck={onCheck} graphNameMap={graphNameMap} /> */}
          {/* pass the checkstate stuff in here */}
        </Grid>
      </Grid>
    </>
  );
}
