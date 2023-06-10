import { action, computed, makeObservable, observable } from "mobx";
import ScoreStore from "./ScoreStore";
import { ScoreInformation } from "../misc/types";
import GameStore from "./GameStore";
import GlobalStore from "./GlobalStore";

export interface TicTacToeGameState extends ScoreInformation {
  gameBoard: (Player | undefined)[],
}

export type Player = "X" | "O";
class TicTacToeStore extends GameStore {

  player: Player;

  currentPlayer: Player;

  gameBoard: (Player | undefined)[] = [];

  scoreStore: ScoreStore;

  constructor(scoreStore: ScoreStore, globalStore: GlobalStore) {
    super(globalStore);
    this.player = "O";
    this.scoreStore = scoreStore;
    this.currentPlayer = "X";
    this.gameBoard = new Array(9).fill(undefined);

    makeObservable(this, {
      player: observable,
      currentPlayer: observable,
      gameBoard: observable,
      setPlayer: action,
      switchTurn: action,
      makeMove: action,
      setPlayerMarkAtPosition: action,
      doStuffAfterSomebodyWins: action,
      handlePlayerCount: action,
      setFullGameState: action,
      setGameBoard: action,
      receiveMessage: action,
      isItMyTurn: computed,
      didWin: computed,
      fullGameState: computed,
    });
  }

  setPlayer(newValue: typeof this.player) {
    this.player = newValue;
  }

  setGameBoard(newValue: typeof this.gameBoard) {
    this.gameBoard = newValue;
  }

  setPlayerMarkAtPosition(index: number) {
    this.gameBoard[index] = this.currentPlayer;
  }

  setFullGameState(state: TicTacToeGameState) {
    const processedState: TicTacToeGameState = {
      playerScore: state.opponentScore,
      opponentScore: state.playerScore,
      gameBoard: state.gameBoard,
    };

    this.scoreStore.setPlayerScore(processedState.playerScore);
    this.scoreStore.setOpponentScore(processedState.opponentScore);
  }

  switchTurn() {
    if (this.currentPlayer === "X") this.currentPlayer = "O";
    if (this.currentPlayer === "O") this.currentPlayer = "X";
  }

  doStuffAfterSomebodyWins() {
    const opponentWon = this.currentPlayer !== this.player;
    if (opponentWon) this.scoreStore.setOpponentScore(this.scoreStore.opponentScore + 1);
    else this.scoreStore.setPlayerScore(this.scoreStore.playerScore);
  }

  makeMove(index: number) {
    if (!this.isItMyTurn) return;
    this.gameBoard[index] = this.currentPlayer;
    this.sendMessage(this.fullGameState);
    const didPlayerWin = this.didWin;
    if (didPlayerWin) this.doStuffAfterSomebodyWins();
  }

  handlePlayerCount(count: number): void {
    if (count === 0) this.setPlayer("X")
    else this.setPlayer("O");
  }

  receiveMessage(): void {
    this.socket.on("receive-message", (state: typeof this.fullGameState) => this.setFullGameState(state));
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

  get fullGameState(): TicTacToeGameState {
    const result = {
      playerScore: this.scoreStore.playerScore,
      opponentScore: this.scoreStore.opponentScore,
      gameBoard: this.gameBoard,
    };

    return result;
  }

}

export default TicTacToeStore;