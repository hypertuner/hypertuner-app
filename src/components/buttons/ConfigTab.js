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
import { serverHost } from '../../api/config';
import { readConfig } from '../../api/rest'

const useStyles = makeStyles(theme => ({
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    pbutton: {
      textAlign: 'right'
    },
}));

export default function ConfigTab({job, transition, configList, setConfigList, status})  {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [configData, setConfigData] = useState([]);

    async function getConfigData() {
        const configData = await readConfig(job);
        console.log(configData);
        //const configData = await configDataResponse.json();
        setConfigData(configData);
    }

    // useEffect(()=>{
    //     // async function getConfigData() {
    //     //     const configDataResponse = await fetch(`${serverHost}/read-config`, {
    //     //         method: 'POST',
    //     //         headers: {
    //     //           Accept: 'application/json',
    //     //           'Content-Type': 'application/json',
    //     //         },
    //     //         body: JSON.stringify({"name": job})
    //     //     });
        
    //     //     //const result = configDataResponse.json()
    
    //     //     const configData = await configDataResponse.json();
    //     //     console.log(configData);
    //     //     setConfigData(configData);
    //     // }
    //     getConfigData();
    // }, []);

    function handleClick() {
        getConfigData();
        setOpen(true);
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
                        <AddConfig onClose={()=>{
                            
                        }} transition={transition} configList={configList} setConfigList={setConfigList} open={open} setOpen={setOpen} name={job} data={configData} />
                    </Grid>
                    <Grid item alignItems="center" xs={3}> 
                        {icon()}
                        <Remove name={job} configList={configList} setConfigList={setConfigList} className={classes.pbutton}/>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}