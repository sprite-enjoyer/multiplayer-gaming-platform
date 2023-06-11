export enum Game {
  TicTacToe = "TicTacToe",
  MemoryGame = "MemoryGame",
}

export interface ScoreInformation {
  playerScore: number,
  opponentScore: number,
}


export interface TicTacToeGameState extends ScoreInformation {
  gameBoard: (Player | undefined)[],
}

export type Player = "X" | "O";
