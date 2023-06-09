import { action, computed, makeObservable, observable } from "mobx";
import ScoreStore from "./ScoreStore";

export type Player = "X" | "O";
class TicTacToeStore {

  player: Player;

  currentPlayer: Player;

  gameBoard: (Player | undefined)[] = [];

  scoreStore: ScoreStore;

  constructor(scoreStore: ScoreStore) {
    this.player = "O"; //TODO
    this.scoreStore = scoreStore;
    this.currentPlayer = "X";
    this.gameBoard = new Array(9).fill(undefined);

    makeObservable(this, {
      player: observable,
      currentPlayer: observable,
      setPlayer: action,
      switchTurn: action,
      makeMove: action,
      setPlayerMarkAtPosition: action,
      isItMyTurn: computed,
      didWin: computed,
    });
  }

  setPlayer(newValue: Player) {
    this.player = newValue;
  }

  switchTurn() {
    if (this.currentPlayer === "X") this.currentPlayer = "O";
    if (this.currentPlayer === "O") this.currentPlayer = "X";
  }

  setPlayerMarkAtPosition(index: number) {
    this.gameBoard[index] = this.currentPlayer;
  }

  makeMove(index: number) {
    this.gameBoard[index] = this.currentPlayer;
    const didPlayerWin = this.didWin;

    if (didPlayerWin) {
      const opponentWon = this.currentPlayer !== this.player;
      if (opponentWon) this.scoreStore.setOpponentScore(this.scoreStore.opponentScore + 1);
      else this.scoreStore.setPlayerScore(this.scoreStore.playerScore);
    }

  }

  get didWin() {
    let playerWon = false;
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const playerLocations: number[] = [];

    this.gameBoard.forEach((val, i) => { if (val === this.currentPlayer) playerLocations.push(i); });

    winningCombinations.forEach(
      (combination) => { if (combination.every(x => playerLocations.includes(x))) playerWon = true; }
    );

    return playerWon;
  }

  get isItMyTurn() {
    return this.currentPlayer === this.player;
  }

}

export default TicTacToeStore;