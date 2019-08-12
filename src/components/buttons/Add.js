import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Save from './Save';
import Play from './Play';
import Slide from '@material-ui/core/Slide';
import ConfigTable from '../pages/ConfigTable';
import TextField from '@material-ui/core/TextField';
import { serverHost } from '../../api/config';


const useStyles = makeStyles(theme => ({
  addPos: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  toolbarButtons: {
    marginLeft: "auto",
    marginRight: -15,
    display: "flex",
    flexDirection: "row"
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // margin: theme.spacing(0.5),
    marginBottom: "17px",
    width: 200
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddButton({configList, setConfigList}) {
  const classes = useStyles();
  const typeLookupMap = { 0: 'float', 1: 'integer', 2: 'boolean', 3: "string" };

  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      {
        title: 'Type',
        field: 'type',
        lookup: typeLookupMap,
      },
      { title: 'Value', field: 'value' },
    ],
    data: [
      {name: "ajfklasj", type: "0", value: "10.01"},
      {name: "jalkdfj", type: "1", value: "20"}
    ],
    name: ""
  });

  const title = <TextField
    id="standard-with-placeholder"
    label="Add Config Title"
    className={classes.textField}
    onChange={changeConfigName}
  />

  function changeConfigName(e) {
    state.name = e.target.value;
  }

  function convertTable(data) {
    let jsonData = {}
    Object.values(data).forEach(function(hyp) {
      if (typeof(hyp["value"]) === "string") {
        jsonData[hyp["name"]] = parseFloat(hyp["value"]);
      } else {
        jsonData[hyp["name"]] = hyp["value"];
      }
    })
    return jsonData;
  }

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSave() {
    const saveData = convertTable(state.data);

    saveData.name = state.name;
    console.log(saveData);

    if (configList.includes(state.name)) {
      alert("This configuration name already exists. Please rename it.")
    } else if (state.name === "") {
      alert("Configuration file name is empty. Please name your configuration file.")
    } else {
      const resultResponse = await fetch(`${serverHost}/create-config`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveData)
      });

      const result = resultResponse.json()

      console.log(result)
    }

    // const configListResponse = await fetch(`${serverHost}/list-config`)
    // let configList = await configListResponse.json();
    // configList = configList.configList;
    // console.log(configList);

    const configListResponse = await fetch(`${serverHost}/list-config`)
    const configListData = await configListResponse.json();
    setConfigList(configListData.configList);
    handleClose();
  }

  return (
    <>
      <Fab onClick={handleClick} color="primary" aria-label="add" className={classes.addPos}>
        <AddIcon />
      </Fab>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div className={classes.toolbarButtons}>
                <Play />
                <Save handleSave={handleSave} state={state}/>
            </div>
          </Toolbar>
        </AppBar>
        <ConfigTable state={state} setState={setState} typeLookupMap={typeLookupMap} title={title}/>
      </Dialog>
    </>
  );
}
