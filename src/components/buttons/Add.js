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
import { createConfig } from '../../api/rest';
import AddConfig from '../pages/AddConfig';


const useStyles = makeStyles(theme => ({
  addPos: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}));

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

export default function AddButton({transition, configList, setConfigList}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // async function handleSave() {
  //   const saveData = convertTable(state.data);

  //   saveData.name = state.name;
  //   console.log(saveData);

  //   if (configList.includes(state.name)) {
  //     alert("This configuration name already exists. Please rename it.")
  //   } else if (state.name === "") {
  //     alert("Configuration file name is empty. Please name your configuration file.")
  //   } else {
  //     const result = createConfig(saveData)

  //     console.log(result)
  //   }

  //   // const configListResponse = await fetch(`${serverHost}/list-config`)
  //   // let configList = await configListResponse.json();
  //   // configList = configList.configList;
  //   // console.log(configList);

  //   const configListResponse = await fetch(`${serverHost}/list-config`)
  //   const configListData = await configListResponse.json();
  //   setConfigList(configListData.configList);
  //   handleClose();
  // }
  
  return (
    <>
      <Fab onClick={handleClick} color="primary" aria-label="add" className={classes.addPos}>
        <AddIcon />
      </Fab>
      <AddConfig transition={transition} configList={configList} setConfigList={setConfigList}  open={open} setOpen={setOpen} name={""} data={{}}/>
    </>
  );
}
