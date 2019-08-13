
    const [configList, setConfigList] = useState([])

    //make API call makes config list 
    useEffect(() => {
        async function getConfigs() {
            const configListResponse = await fetch(`${serverHost}/list-config`)
            const configListData = await configListResponse.json();
            console.log(configListData.configList);
            setConfigList(configListData.configList);
        }
        getConfigs()
    }, [])