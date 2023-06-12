import { action, computed, makeObservable, observable } from "mobx";
import ScoreStore from "./ScoreStore";
import { TicTacToePlayer, FullScoreStoreData, TicTacToeGameState } from "../misc/types";
import GameStore from "./GameStore";
import GlobalStore from "./GlobalStore";

class TicTacToeStore extends GameStore {

  player?: TicTacToePlayer;

  gameBoard: (TicTacToePlayer | undefined)[] = new Array(9).fill(undefined);

  scoreStore: ScoreStore;

  playerMovesRestricted = true;

  everyPlayerPresent = false;

  constructor(scoreStore: ScoreStore, globalStore: GlobalStore) {
    super(globalStore);
    this.scoreStore = scoreStore;

    makeObservable(this, {
      player: observable,
      gameBoard: observable,
      playerMovesRestricted: observable,
      everyPlayerPresent: observable,
      setPlayer: action,
      makeMove: action,
      setPlayerMarkAtPosition: action,
      setEveryPlayerPresent: action,
      doStuffAfterSomebodyWins: action,
      handlePlayerCount: action,
      setCurrentPlayer: action,
      setFullGameState: action,
      restart: action,
      setGameBoard: action,
      waitForMessage: action,
      waitForScoreUpdate: action,
      setPlayerMovesRestricted: action,
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

  setPlayerMovesRestricted(newValue: boolean) {
    this.playerMovesRestricted = newValue;
  }

  setPlayerMarkAtPosition(index: number) {
    this.gameBoard[index] = this.player;
  }

  setEveryPlayerPresent(newValue: boolean) {
    this.everyPlayerPresent = newValue;
  }

  setFullGameState(state: TicTacToeGameState) {
    const processedState: TicTacToeGameState = {
      playerScore: state.opponentScore,
      opponentScore: state.playerScore,
      gameBoard: state.gameBoard,
    };

    this.setGameBoard(processedState.gameBoard);
    this.scoreStore.setPlayerScore(processedState.playerScore);
    this.scoreStore.setOpponentScore(processedState.opponentScore);
  }

  setCurrentPlayer(newValue: TicTacToePlayer) {
    this.player = newValue;
  }

  doStuffAfterSomebodyWins() {
    this.scoreStore.setPlayerScore(this.scoreStore.playerScore + 1);
    this.sendScoreInformation();
  }

  makeMove(index: number) {
    if (!this.everyPlayerPresent || this.gameBoard[index] || this.playerMovesRestricted) return;
    this.gameBoard[index] = this.player;
    this.setPlayerMovesRestricted(true);
    this.sendMessage(this.fullGameState);
    if (this.didWin) this.doStuffAfterSomebodyWins();
  }

  handlePlayerCount(count: number): void {
    if (count === 0) this.setPlayer("O");
    else this.setPlayer("X");
    if (this.player === "X") this.setPlayerMovesRestricted(false);
    if (count === 1) this.setEveryPlayerPresent(true);
  }

  waitForMessage(): void {
    this.socket.on("receive-message", (state: typeof this.fullGameState) => {
      this.setFullGameState(state);
      this.setPlayerMovesRestricted(false);
      this.setEveryPlayerPresent(true);
    });
  }

  sendScoreInformation() {
    this.socket.emit("send-score", this.globalStore.roomID, this.scoreStore.fullScoreStoreData);
  }

  waitForScoreUpdate() {
    this.socket.on("receive-score", (fullScoreStoreData: FullScoreStoreData) => {
      this.scoreStore.setFullScoreStoreData(fullScoreStoreData);
      this.setPlayerMovesRestricted(true);
    })
  }

  restart(): void {
    const shouldFreezeThisPlayer = this.player === "O";
    this.gameBoard = new Array(9).fill(undefined);
    this.setPlayerMovesRestricted(shouldFreezeThisPlayer);
    this.sendMessage(this.fullGameState);
    if (!shouldFreezeThisPlayer) this.sendScoreInformation();
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

    this.gameBoard.forEach((val, i) => { if (val === this.player) playerLocations.push(i); });

    winningCombinations.forEach(
      (combination) => { if (combination.every(x => playerLocations.includes(x))) playerWon = true; }
    );

    return playerWon;
  }

  override get fullGameState(): TicTacToeGameState {
    const result = {
      playerScore: this.scoreStore.playerScore,
      opponentScore: this.scoreStore.opponentScore,
      gameBoard: this.gameBoard,
    };

    return result;
  }

}

export default TicTacToeStore;