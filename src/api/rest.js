import { serverHost } from "./config";

const getCall = async route => {
  const response = await fetch(`${serverHost}/${route}`);
  return response.json();
};

const postCall = async (route, payload) => {
  const response = await fetch(`${serverHost}/${route}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return response.json();
};

export const getConfigList = () => getCall("list-config");

export const createConfig = saveData => postCall("create-config", saveData);

export const readConfig = name => postCall("read-config", {name});
