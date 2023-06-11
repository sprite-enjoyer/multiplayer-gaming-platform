export enum Game {
  TicTacToe = "TicTacToe",
  MemoryGame = "MemoryGame",
}

export interface FullScoreStoreData {
  playerScore: number,
  opponentScore: number,
}

export interface TicTacToeGameState extends FullScoreStoreData {
  gameBoard: (Player | undefined)[],
}

export type Player = "X" | "O";
