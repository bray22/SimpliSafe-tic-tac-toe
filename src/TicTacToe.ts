export type Player = "X" | "O";
export type Cell = Player | null;

export type Row = [Cell, Cell, Cell, Cell];
export type Board = [Row, Row, Row, Row];

export class TicTacToe {
  public checkWinner(board: Board): Player | null {
    this.validateBoard(board);

    return (
      this.checkRows(board) ??
      this.checkColumns(board) ??
      this.checkDiagonals(board) ??
      this.checkCorners(board) ??
      this.checkBoxes(board)
    );
  }
  public anyMovesLeft(board: Board): boolean {
    return board.some((row) => row.some((cell) => cell === null));
  }

  public isGameOver(board: Board): boolean {
    return this.checkWinner(board) !== null || !this.anyMovesLeft(board);
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

  private allSame(cells: readonly [Cell, Cell, Cell, Cell]): Player | null {
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
      const cells: Row = [
        board[0][col],
        board[1][col],
        board[2][col],
        board[3][col],
      ];

      const winner = this.allSame(cells);

      if (winner) {
        return winner;
      }
    }

    return null;
  }

  private checkCorners(board: Board): Player | null {
    const corners: Row = [board[0][0], board[0][3], board[3][0], board[3][3]];

    return this.allSame(corners);
  }

  private checkBoxes(board: Board): Player | null {
    for (let row = 0; row < this.size - 1; row++) {
      for (let col = 0; col < this.size - 1; col++) {
        const cells: Row = [
          board[row][col],
          board[row][col + 1],
          board[row + 1][col],
          board[row + 1][col + 1],
        ];

        const winner = this.allSame(cells);

        if (winner) {
          return winner;
        }
      }
    }

    return null;
  }

  private checkDiagonals(board: Board): Player | null {
    const leftToRight: Row = [
      board[0][0],
      board[1][1],
      board[2][2],
      board[3][3],
    ];

    const rightToLeft: Row = [
      board[0][3],
      board[1][2],
      board[2][1],
      board[3][0],
    ];

    return this.allSame(leftToRight) ?? this.allSame(rightToLeft);
  }
}
