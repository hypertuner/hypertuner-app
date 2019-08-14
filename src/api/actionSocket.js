import { socketHost } from "./config";

export class ActionSocket extends WebSocket {
  ping(action, payload={}) {
    this.send(
      JSON.stringify({
        action,
        payload
      })
    );
  }
}

export const graphApi = new ActionSocket(`${socketHost}/graph`);

export const terminalSocket = new WebSocket(`${socketHost}/terminal`);

export const progressSocket = new ActionSocket(`${socketHost}/progress`);

export const graphWatch = name => graphApi.ping("watch", { name });

export const graphUnwatch = (nameId, watchId) =>
  graphApi.ping("unwatch", { nameId, watchId });

export const progressWatch = () => progressSocket.ping("watch");

export const progressUnwatch = (watchId) => progressSocket.ping('unwatch', {watchId});
