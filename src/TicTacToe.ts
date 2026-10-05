export type Player = "X" | "O";
export type Cell = Player | null;

export type Row = [Cell, Cell, Cell, Cell];
export type Board = [Row, Row, Row, Row];

export class TicTacToe {
  public checkWinner(board: Board): Player | null {
    this.validateBoard(board);
    return this.checkRows(board) ?? this.checkColumns(board);
  }

  public anyMovesLeft(board: Board): boolean {
    return board.some((row) => row.some((cell) => cell === null));
  }

  public isGameOver(board: Board): boolean {
    throw new Error("Not implemented");
  }

  private readonly size = 4;

  private validateBoard(board: Board): void {
    if (
      board.length !== this.size ||
      board.some((row) => row.length !== this.size)
    ) {
      throw new Error("Board must be exactly 4x4.");
    }
  }

  private allSame(cells: Cell[]): Player | null {
    const first = cells[0];

    if (first === null) {
      return null;
    }

    return cells.every((cell) => cell === first) ? first : null;
  }

  // horizontal win
  private checkRows(board: Board): Player | null {
    for (const row of board) {
      const winner = this.allSame(row);

      if (winner) {
        return winner;
      }
    }

    return null;
  }

  // vertical win
  private checkColumns(board: Board): Player | null {
    for (let col = 0; col < this.size; col++) {
      const cells = board.map((row) => row[col]);

      const winner = this.allSame(cells);

      if (winner) {
        return winner;
      }
    }

    return null;
  }
}
