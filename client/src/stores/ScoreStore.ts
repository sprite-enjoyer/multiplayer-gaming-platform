import { action, computed, makeObservable, observable } from "mobx";
import { FullScoreStoreData } from "../misc/types";

class ScoreStore {

  playerScore: number = 0;

  opponentScore: number = 0;

  constructor() {
    makeObservable(this, {
      playerScore: observable,
      opponentScore: observable,
      setPlayerScore: action,
      setOpponentScore: action,
      setFullScoreStoreData: action,
      fullScoreStoreData: computed,
    });
  }

  setPlayerScore(newValue: number) {
    this.playerScore = newValue;
  }

  setOpponentScore(newValue: number) {
    this.opponentScore = newValue;
  }

  setFullScoreStoreData(newValue: FullScoreStoreData) {
    const { playerScore, opponentScore } = newValue;
    this.setPlayerScore(playerScore);
    this.setOpponentScore(opponentScore);
  }

  get fullScoreStoreData() {
    return {
      playerScore: this.playerScore,
      opponentScore: this.opponentScore
    };
  }


}

export default ScoreStore;