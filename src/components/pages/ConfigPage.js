import React, {useState, useEffect} from 'react';
import NavBar from '../navigation/NavBar';
import ConfigGrid from '../objects/ConfigGrid';
import Add from '../buttons/Add';
import { serverHost } from '../../api/config';

export default function ConfigPage() {
    const [configList, setConfigList] = useState([])

    //makes API call to backend to get config list (array of strings)
    //should abstract this into a separate file
    useEffect(()=>{
        async function getConfigs() {
            const configListResponse = await fetch(`${serverHost}/list-config`)
            const configListData = await configListResponse.json();
            //write something to catch an empty configList 
            if (configListData.configList) {
                setConfigList(configListData.configList);
            }
            else{
                setConfigList([]);
            }
        }
        getConfigs()
    }, [])


    console.log(configList);

    return (
        <>
            <NavBar />
            <ConfigGrid configList={configList}/>
            <Add configList={configList} setConfigList={setConfigList}/>
        </>
    );
}