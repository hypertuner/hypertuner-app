import { socketHost } from "./config";

export class ActionSocket extends WebSocket {
  ping(action, name) {
    this.send(
      JSON.stringify({
        action,
        name
      })
    );
  }
}

export const graphApi = new ActionSocket(`${socketHost}/graph`)