import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ConfigTab from "../buttons/ConfigTab";
import { progressSocket, progressWatch, progressUnwatch } from "../../api/actionSocket";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin : 'auto'
  },
  pbutton: {
    textAlign: "right"
  },
  grid: {
    margin: theme.spacing(3)
  }
}));


export default function FullWidthGrid({transition, configList, setConfigList}) {
  const classes = useStyles();


  const [processStatuses, setProcessStatuses] = useState({});
  const [progressWatchId, setProgressWatchId] = useState();

  useEffect(() => {
    const handleMessage = ({ data }) => {
      const jsonData = JSON.parse(data);

      if (!jsonData.success) return;

      if (jsonData.type === "progress-stop") {
        setProgressWatchId(null);
      }

      if (jsonData.type === "progress-data") {
        setProcessStatuses(jsonData.processStatus);
        setProgressWatchId(jsonData.watchId);
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

  console.log(processStatuses);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" >
        {
          Object.entries(processStatuses).map(([name, status]) =>
            <Grid key={name} item className={classes.grid}>
              <ConfigTab job={name} transition={transition} configList={Object.keys(processStatuses)} setConfigList={setConfigList} status={status} />
            </Grid>
          )
        }
      </Grid>
    </div>
  );
}
