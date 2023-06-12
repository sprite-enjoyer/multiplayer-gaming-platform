export enum Game {
  TicTacToe = "TicTacToe",
  MemoryGame = "MemoryGame",
}
export type TicTacToePlayer = "X" | "O";

export interface FullScoreStoreData {
  playerScore: number,
  opponentScore: number,
}

export interface TicTacToeGameState extends FullScoreStoreData {
  gameBoard: (TicTacToePlayer | undefined)[],
}
