export const serverHost =
  window.location.port === "3001" ? `http://${window.location.host}:3000` : "";

export const socketHost = `ws://${window.location.host}:9001`;
