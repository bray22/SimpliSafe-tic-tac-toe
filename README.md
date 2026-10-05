# 4x4 Tic-Tac-Toe Solver

A Node.js/TypeScript board-state evaluator for the 4x4 Tic-Tac-Toe exercise.

## Assumptions and API

- The board is always 4x4.
- The board is a dense nested array indexed as `board[row][column]`.
- Each cell contains `"X"`, `"O"`, or `null`.
- `null` represents an empty cell.
- `checkWinner` returns `"X"` or `"O"` when a winning condition exists,
  otherwise `null`.
- `anyMovesLeft` returns whether at least one empty cell remains.
  It can return true even after a player has won.
- `isGameOver` is true when there is a winner or no moves remain.
- Horizontal and vertical wins require all four cells in a row or column.
- Diagonal wins use only the two full-length diagonals.
- A corner win requires the same player in all four corners; the interior
  cells do not matter.
- A "2x2 box" means any contiguous 2x2 region of the board.
- The evaluator does not enforce gravity, turn counts, turn order, or legal
  move history, and does not search for optimal moves.
- Boards with winners for both players are unsupported. The implementation
  returns the first winning pattern found, not a conflict result.
- TypeScript tuples describe the supported dimensions and cell values.
  `checkWinner` checks dimensions at runtime; `isGameOver` uses that check
  indirectly. `anyMovesLeft` assumes correctly shaped input. These methods
  are not general-purpose validators for JSON or other untyped input:
  cell values, array structure, and sparse arrays are not validated.
- The methods do not mutate the input board.

## Setup

```sh
npm install
```

## Run Tests

```sh
npm test
```

## Type Check

```sh
npm run typecheck
```

## AI assistance

AI assistance was used for requirements discussion, implementation review,
and updates to helper typing, tests, and documentation. Include the full
exported AI session transcripts with the assessment submission; this
disclosure is not a substitute for those transcripts.
