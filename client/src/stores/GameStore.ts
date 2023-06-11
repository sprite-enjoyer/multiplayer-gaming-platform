import { action, makeObservable, observable } from "mobx";
import { Socket, io } from "socket.io-client";
import GlobalStore from "./GlobalStore";

abstract class GameStore {

  socket: Socket;

  globalStore: GlobalStore;

  opponent?: string;

  shouldStartGame = false;

  abstract frozen: boolean;

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
      if (!success) return;
      this.handlePlayerCount(length);
    });
  }

  sendMessage<T>(message: T) {
    console.log("sending message")
    this.socket.emit("send-message", message, this.globalStore.roomID);
  }

  abstract receiveMessage(): void;

  abstract handlePlayerCount(count: number): void;

  abstract setFullGameState(state: any): void;

  abstract get fullGameState(): any;
}

export default GameStore;