import { socketHost } from "./config";

export class ActionSocket extends WebSocket {
  ping(action, payload = {}) {
    this.send(
      JSON.stringify({
        action,
        payload
      })
    );
  }
}

export const graphSocket = new ActionSocket(`${socketHost}/graph`);

export const terminalSocket = new WebSocket(`${socketHost}/terminal`);

export const progressSocket = new ActionSocket(`${socketHost}/progress`);

export const graphWatch = name => graphSocket.ping("watch", { name });

export const graphUnwatch = (nameId, watchId) =>
  graphSocket.ping("unwatch", { nameId, watchId });

export const progressWatch = () => progressSocket.ping("watch");

export const progressUnwatch = watchId =>
  progressSocket.ping("unwatch", { watchId });
