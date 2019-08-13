const getCall = async (route) => {
    const response = await fetch(`${serverHost}/${route}`)
   return configListResponse.json();
}

const postCall = async (route) => {
    
}