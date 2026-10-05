## Assumptions

- The board is always 4x4.
- Each cell contains `"X"`, `"O"`, or `null`.
- `null` represents an empty cell.
- `checkWinner` returns `"X"` or `"O"` when a winning condition exists,
  otherwise `null`.
- `anyMovesLeft` returns whether at least one empty cell remains.
- `isGameOver` is true when there is a winner or no moves remain.
- A "2x2 box" means any contiguous 2x2 region of the board.
- The input is assumed to represent a valid game state; the solver does
  not validate turn order or other illegal board states.