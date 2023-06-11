import { action, computed, makeObservable, observable } from "mobx";
import ScoreStore from "./ScoreStore";
import { Player, TicTacToeGameState } from "../misc/types";
import GameStore from "./GameStore";
import GlobalStore from "./GlobalStore";

class TicTacToeStore extends GameStore {

  player: Player;

  gameBoard: (Player | undefined)[] = [];

  scoreStore: ScoreStore;

  frozen = true;

  constructor(scoreStore: ScoreStore, globalStore: GlobalStore) {
    console.log("store created")
    super(globalStore);
    this.player = "O";
    this.scoreStore = scoreStore;
    this.gameBoard = new Array(9).fill(undefined);

    makeObservable(this, {
      player: observable,
      gameBoard: observable,
      frozen: observable,
      setPlayer: action,
      makeMove: action,
      setPlayerMarkAtPosition: action,
      doStuffAfterSomebodyWins: action,
      handlePlayerCount: action,
      setCurrentPlayer: action,
      setFullGameState: action,
      setGameBoard: action,
      receiveMessage: action,
      setFrozen: action,
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

  setFrozen(newValue: boolean) {
    this.frozen = newValue;
  }

  setPlayerMarkAtPosition(index: number) {
    this.gameBoard[index] = this.player;
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

  setCurrentPlayer(newValue: Player) {
    this.player = newValue;
  }

  doStuffAfterSomebodyWins() {
    this.scoreStore.setPlayerScore(this.scoreStore.playerScore + 1);
    // TODO also notify the other player 
  }

  makeMove(index: number) {
    this.setFrozen(true);
    this.gameBoard[index] = this.player;
    this.sendMessage(this.fullGameState);
    const didPlayerWin = this.didWin;
    if (didPlayerWin) this.doStuffAfterSomebodyWins();
  }

  handlePlayerCount(count: number): void {
    if (count === 0) this.setPlayer("X");
    else this.setPlayer("O");
    if (this.player === "X") this.setFrozen(false);
  }

  receiveMessage(): void {
    this.socket.on("receive-message", (state: typeof this.fullGameState) => {
      this.setFullGameState(state);
      this.setFrozen(false);
      console.log("data received: ", state);
    });
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