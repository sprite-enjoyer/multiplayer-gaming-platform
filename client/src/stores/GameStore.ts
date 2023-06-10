import { action, makeObservable, observable } from "mobx";
import { Socket, io } from "socket.io-client";
import GlobalStore from "./GlobalStore";

abstract class GameStore {

  socket: Socket;

  globalStore: GlobalStore;

  opponent?: string;

  shouldStartGame = false;

  constructor(globalStore: GlobalStore, opponent?: string) {
    this.socket = io(import.meta.env.VITE_SERVER_URL);
    this.opponent = opponent;
    this.globalStore = globalStore;

    makeObservable(this, {
      opponent: observable,
      shouldStartGame: observable,
      setOpponent: action,
    });
  }

  setOpponent(newValue: string) {
    this.opponent = newValue;
  }

  joinRoom() {
    this.socket.emit("join-room", this.globalStore.roomID, (length: number, success: boolean) => {
      if (!success) {
        console.log("room was apparently full");
        return;
      }

      this.handlePlayerCount(length);
    });
    return this;
  }

  sendMessage<T>(message: T) {
    this.socket.emit("send-message", message);
  }

  abstract receiveMessage<T>(): void;

  abstract handlePlayerCount(count: number): void;

}

export default GameStore;