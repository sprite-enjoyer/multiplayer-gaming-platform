import { action, makeObservable, observable } from "mobx";
import { Socket, io } from "socket.io-client";
import GlobalStore from "./GlobalStore";

class GameStore {

  socket: Socket;

  globalStore: GlobalStore;

  opponent?: string;

  constructor(globalStore: GlobalStore, opponent?: string) {
    this.socket = io(import.meta.env.VITE_SERVER_URL);
    this.opponent = opponent;
    this.globalStore = globalStore;

    makeObservable(this, {
      opponent: observable,
      setOpponent: action,
    });
  }

  setOpponent(newValue: string) {
    this.opponent = newValue;
  }

}

export default GameStore;