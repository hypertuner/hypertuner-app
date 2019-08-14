import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Play from '../buttons/Play';
import Done from '../buttons/Done';
import InProgress from '../buttons/InProgress';
import Queued from '../buttons/Queued';
import Remove from '../buttons/Remove';
import Typography from '@material-ui/core/Typography';
import AddConfig from '../pages/AddConfig';

import { readConfig } from '../../api/rest'

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  pbutton: {
    textAlign: 'right'
  }
}))

export default function ConfigTab({
  job,
  transition,
  status
}) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [configData, setConfigData] = useState([])
  const typeLookupMap = { 0: 'float', 1: 'integer', 2: 'boolean', 3: 'string' }

  async function getConfigData() {
    const configDataResponse = await readConfig(job)
    setConfigData(convertResponse(configDataResponse))
  }

  function isInt(n) {
    return Number(n) === n && n % 1 === 0
  }

  function isFloat(n) {
    return Number(n) === n && n % 1 !== 0
  }

  function getValueType(value) {
    console.log(value, typeof(value));
    if (isInt(value)) {
      return getKeyByValue(typeLookupMap, 'integer')
    } else if (isFloat(value)) {
      return getKeyByValue(typeLookupMap, 'float')
    } else if (typeof value === 'boolean') {
      return getKeyByValue(typeLookupMap, 'boolean')
    } else {
      return getKeyByValue(typeLookupMap, 'string')
    }
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
  }

  function convertResponse(data) {
    let respData = []
    delete data['success']
    delete data['name']
    Object.keys(data).forEach(function(keyName, keyIndex) {
      let row = {}
      row['name'] = keyName
      row['value'] = data[keyName]
      row['type'] = getValueType(data[keyName])
      respData.push(row)
    })
    return respData
  }

  async function handleClick() {
    await getConfigData()
    setOpen(true)
  }

  const icon = () => {
    if (status === "saved") {
        return <Play name={job} className={classes.pbutton}/>
    } else if (status === "queued") {
        return <Queued name={job} className={classes.pbutton}/>
    } else if (status === "running") {
        return <InProgress name={job} className={classes.pbutton}/>
    } else {
        return <Done name={job} className={classes.pbutton}/>
    }
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={9}>
            <Button onClick={handleClick}>
              <Typography className={classes.title}>{job}</Typography>
            </Button>
            <AddConfig
              transition={transition}
              open={open}
              setOpen={setOpen}
              defaultName={job}
              defaultData={configData}
            />
          </Grid>
          <Grid item xs={3}>
            {/* <Play name={job} className={classes.pbutton} /> */}
            {icon()}
            <Remove
              name={job}
              className={classes.pbutton}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
