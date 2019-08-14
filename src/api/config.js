export const serverHost =
  window.location.port === "3001"
    ? `http://${window.location.hostname}:3000`
    : "";

export const socketHost = `ws://${window.location.hostname}:9001`;
