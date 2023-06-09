import { action, makeObservable, observable } from "mobx";

class ScoreStore {

  playerScore: number = 0;

  opponentScore: number = 0;

  constructor() {
    makeObservable(this, {
      playerScore: observable,
      opponentScore: observable,
      setPlayerScore: action,
      setOpponentScore: action,
    });
  }

  setPlayerScore(newValue: number) {
    this.playerScore = newValue;
  }

  setOpponentScore(newValue: number) {
    this.opponentScore = newValue;
  }
}

export default ScoreStore;