import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../navigation/NavBar";
import { CheckBoxGroup } from "../objects/Checkbox";
import { ProcessGraph } from "../objects/ProcessGraph";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { graphSocket, graphWatch, graphUnwatch, progressSocket, progressWatch, progressUnwatch  } from "../../api/actionSocket";

const useStyles = makeStyles(theme => ({
  graph: {
    height: '90%',
    width: '90%'
  },
  gridCon: {
    height: '100%'
  },
  graphContainer: {
    padding: '5%',
    width: '90%',
    height: '90%'
  }
}))

export default function GraphPage() {
  const classes = useStyles()

  const [graphDataMap, setGraphDataMap] = useState({})

  //map function: you take something and for everything you do something
  //filter function: check everything you need against it and filter out what you don't need

  useEffect(() => {
    const handleMessage = ({ data }) => {
      const jsonData = JSON.parse(data)
      if (!jsonData.success) return;

      if (jsonData.type === 'watch-stop') {
        setGraphDataMap(currentGraphData => ({
          ...currentGraphData,
          [jsonData.graphName]: null
        }))
      }

      if (jsonData.type === 'watch-data') {
        setGraphDataMap(currentGraphData => ({
          ...currentGraphData,
          [jsonData.graphName]: jsonData
        }))
      }
    }

    graphSocket.addEventListener('message', handleMessage)

    return () => {
      graphSocket.removeEventListener('message', handleMessage)
      Object.values(graphDataMap)
        .filter(v => !!v)
        .map(({ graphName, watchId }) => graphUnwatch(graphName, watchId))
      // graphApi.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const [progressWatchId, setProgressWatchId] = useState();

  useEffect(() => {
    const handleMessage = ({ data }) => {
      const jsonData = JSON.parse(data);

      if (!jsonData.success) return;

      if (jsonData.type === "progress-stop") {
        setProgressWatchId(null);
      }

      if (jsonData.type === "progress-data") {
        setProgressWatchId(jsonData.watchId);
        
        const displayableGraphs = Object.keys(jsonData.processStatus).filter((e) => {
          return jsonData.processStatus[e] === 'finished' || jsonData.processStatus[e] === 'running';
        })
        setGraphDataMap(displayableGraphs.reduce((p, c) => {
          p[c] = null;
          return p;
        }, {}));
        displayableGraphs.filter((c, i) => i < 3).map(c => graphWatch(c));
      }
    };

    progressWatch();
    progressSocket.addEventListener("message", handleMessage)

    return () => {
      progressSocket.removeEventListener("message", handleMessage);
      progressUnwatch(progressWatchId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onCheck = (name, value) => event => {
    if (event.target.checked) {
      graphWatch(name)
    } else {
      graphUnwatch(name, value.watchId)
    }
  };
  
  return (
    <>
      <NavBar />
      <Grid container className={classes.graph}>
        <Grid item xs={12} sm={9}>
          <ProcessGraph
            graphList={Object.values(graphDataMap).filter(v => !!v)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CheckBoxGroup>
            {Object.entries(graphDataMap).map(([name, value]) => (
              <FormControlLabel
                key={name}
                control={
                  <Checkbox checked={!!value} onChange={onCheck(name, value)} />
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
  )
}
