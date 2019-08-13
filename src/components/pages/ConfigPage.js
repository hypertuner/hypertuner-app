import React, {useState, useEffect} from 'react';
import NavBar from '../navigation/NavBar';
import ConfigGrid from '../objects/ConfigGrid';
import Add from '../buttons/Add';
import { getConfigList } from '../../api/rest';

export default function ConfigPage() {
    const [configList, setConfigList] = useState([])

    useEffect(()=>{
        (async () =>  {
            const configListData = await getConfigList();
            console.log(configListData.configList);
            setConfigList(configListData.configList);
        })()
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