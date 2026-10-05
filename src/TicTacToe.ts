export type Player = "X" | "O";
export type Cell = Player | null;

export type Row = [Cell, Cell, Cell, Cell];
export type Board = [Row, Row, Row, Row];

export class TicTacToe {
  public checkWinner(board: Board): Player | null {
    throw new Error("Not implemented");
  }

  public anyMovesLeft(board: Board): boolean {
    throw new Error("Not implemented");
  }

  public isGameOver(board: Board): boolean {
    throw new Error("Not implemented");
  }
}