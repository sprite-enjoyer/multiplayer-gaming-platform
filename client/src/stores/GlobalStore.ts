import { action, computed, makeObservable, observable } from "mobx"

class GlobalStore {

  playerName?: string

  roomID?: string

  constructor() {
    makeObservable(this, {
      playerName: observable,
      roomID: observable,
      setPlayerName: action,
      setRoomID: action,
      isPlayerPresent: computed,
      hasPlayerJoinedRoom: computed,
    });
  }

  setPlayerName(newValue: string) {
    this.playerName = newValue
  }

  setRoomID(newValue: string) {
    this.roomID = newValue;
  }

  get isPlayerPresent() {
    return !!this.playerName;
  }

  get hasPlayerJoinedRoom() {
    return !!this.roomID;
  }

}

export default GlobalStore;