import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ConfigTab from "../buttons/ConfigTab";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "auto"
  },
  title: {
    // textAlign: 'left',
    // margin: 'auto'
  },
  pbutton: {
    textAlign: "right"
  },
  grid: {
    margin: theme.spacing(3)
  }
}));

export default function FullWidthGrid({ configList }) {
  const classes = useStyles();

  // const [configList, setConfigList] = useState([])

  // useEffect(()=>{
  //   async function getConfigs() {
  //     const configListResponse = await fetch(`${serverHost}/list-config`)
  //     const configListData = await configListResponse.json();
  //     console.log(configListData.configList);
  //     setConfigList(configListData.configList);
  //   }
  //   getConfigs()
  // }, [])

  // console.log(configList);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center">
        {configList.map(config => (
          <Grid key={config} item className={classes.grid}>
            <ConfigTab job={config} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
