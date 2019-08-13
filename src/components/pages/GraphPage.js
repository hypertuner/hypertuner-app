import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../navigation/NavBar";
import { CheckBoxGroup } from "../objects/Checkbox";
import { ProcessGraph } from "../objects/ProcessGraph";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { serverHost } from '../../api/config';

const useStyles = makeStyles(theme => ({
    graph: {
        height: "90%"
    },
    gridCon: {
        height: "100%"
    }
}));

export default function GraphPage() {
    const [configList, setConfigList] = useState([]) //this is fine

    const [graphNameMap, setGraphNameMap] = useState(
       {"c1":true}
    )

    //make API call makes config list 
    useEffect(() => {
        async function getConfigs() {
            const configListResponse = await fetch(`${serverHost}/list-config`)
            const configListData = await configListResponse.json();
            setConfigList(configListData.configList);
            setGraphNameMap(getCheckObject(configListData.configList));
        }
        getConfigs();
    }, [])
    
    // console.log(configList)
    // console.log(graphNameMap)

    //array of strings [name1, name2, name3, name4]

    const classes = useStyles();

    //load from the fucking end point
    const [graphData, setGraphData] = useState([
        {
            name: "c1",
            data: [{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 15 }, { x: 4, y: 12 }]
        },
        {
            name: "c2",
            data: [{ x: 1, y: 10 }, { x: 2, y: 4 }, { x: 3, y: 2 }, { x: 4, y: 15 }]
        },
        {
            name: "c3",
            data: [{ x: 1, y: 7 }, { x: 2, y: 11 }, { x: 3, y: 9 }, { x: 4, y: 2 }]
        }
    ]);

    //function that returns , given config list , return object of all configs
    function getCheckObject(configList){
        let newObject = {};
        let arrayLength = configList.length;
        for (var i = 0; i <arrayLength; i++){
            newObject[configList[i]] = false;
        }
        return newObject; 
    }

    // const [graphNameMap, setGraphNameMap] = useState(
    //     Object.assign(configList, [false, false, false, true, false])
    //  );

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
                    <ProcessGraph graphData={graphData.filter(g => graphNameMap[g.name])} />
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

//graph: load the real thing from saved data endpoint 