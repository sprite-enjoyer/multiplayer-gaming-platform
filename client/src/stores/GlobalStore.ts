import { action, computed, makeObservable, observable } from "mobx"
import { Game } from "../misc/types";

class GlobalStore {

  playerName?: string;

  roomID?: string;

  currentGame?: Game;

  constructor() {

    makeObservable(this, {
      playerName: observable,
      roomID: observable,
      currentGame: observable,
      setPlayerName: action,
      setRoomID: action,
      setCurrentGame: action,
      isPlayerPresent: computed,
      hasPlayerJoinedRoom: computed,
      hasPlayerJoinedGame: computed,
    });
  }

  setPlayerName(newValue: string) {
    this.playerName = newValue
  }

  setRoomID(newValue: string) {
    this.roomID = newValue;
  }

  setCurrentGame(newValue?: Game) {
    this.currentGame = newValue;
  }

  get isPlayerPresent() {
    return !!this.playerName;
  }

  get hasPlayerJoinedRoom() {
    return !!this.roomID;
  }

  get hasPlayerJoinedGame() {
    return this.currentGame !== undefined;
  }

}

export default GlobalStore;