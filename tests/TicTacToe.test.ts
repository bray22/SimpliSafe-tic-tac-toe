import { describe, expect, it } from "vitest";
import { TicTacToe, type Board, type Cell } from "../src/TicTacToe.js";

function emptyBoard(): Board {
  return [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
}

type Coordinate = [number, number];

const nearWinPatterns: { name: string; cells: Coordinate[] }[] = [
  {
    name: "column",
    cells: [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  },
  {
    name: "main diagonal",
    cells: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
    ],
  },
  {
    name: "anti-diagonal",
    cells: [
      [0, 3],
      [1, 2],
      [2, 1],
      [3, 0],
    ],
  },
  {
    name: "corners",
    cells: [
      [0, 0],
      [0, 3],
      [3, 0],
      [3, 3],
    ],
  },
  {
    name: "box",
    cells: [
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ],
  },
];

describe("TicTacToe", () => {
  const game = new TicTacToe();

  describe("anyMovesLeft", () => {
    it("returns true for an all-empty board", () => {
      expect(game.anyMovesLeft(emptyBoard())).toBe(true);
    });

    it("returns true when only the final cell is empty", () => {
      const board: Board = [
        ["X", "O", "X", "O"],
        ["O", "X", "O", "X"],
        ["X", "O", "X", "O"],
        ["O", "X", "O", null],
      ];

      expect(game.anyMovesLeft(board)).toBe(true);
    });

    it("returns true after a win when empty cells remain", () => {
      const board = emptyBoard();
      board[0] = ["X", "X", "X", "X"];

      expect(game.checkWinner(board)).toBe("X");
      expect(game.anyMovesLeft(board)).toBe(true);
      expect(game.isGameOver(board)).toBe(true);
    });

    it("returns true when an empty cell exists", () => {
      const board: Board = [
        ["X", "O", "X", "O"],
        ["O", "X", "O", "X"],
        ["X", "O", null, "O"],
        ["O", "X", "O", "X"],
      ];

      expect(game.anyMovesLeft(board)).toBe(true);
    });

    it("returns false when the board is full", () => {
      const board: Board = [
        ["X", "O", "X", "O"],
        ["O", "X", "O", "X"],
        ["X", "O", "X", "O"],
        ["O", "X", "O", "X"],
      ];

      expect(game.anyMovesLeft(board)).toBe(false);
    });
  });

  describe("checkWinner", () => {
    describe.each(["X", "O"] as const)("patterns for %s", (player) => {
      it.each([0, 1, 2])("detects every box starting in row %i", (row) => {
        for (let col = 0; col < 3; col++) {
          const board = emptyBoard();
          board[row][col] = player;
          board[row][col + 1] = player;
          board[row + 1][col] = player;
          board[row + 1][col + 1] = player;

          expect(game.checkWinner(board), `box at (${row}, ${col})`).toBe(
            player,
          );
        }
      });

      it.each(["main", "anti"] as const)(
        "detects the %s diagonal",
        (direction) => {
          const board = emptyBoard();
          for (let row = 0; row < 4; row++) {
            board[row][direction === "main" ? row : 3 - row] = player;
          }

          expect(game.checkWinner(board)).toBe(player);
        },
      );

      describe.each(nearWinPatterns)("$name near-wins", ({ cells }) => {
        it.each([0, 1, 2, 3])(
          "rejects an incomplete or blocked pattern at cell %i",
          (index) => {
            const replacements: Cell[] = [null, player === "X" ? "O" : "X"];
            for (const replacement of replacements) {
              const board = emptyBoard();
              for (const [row, col] of cells) {
                board[row][col] = player;
              }
              const [row, col] = cells[index];
              board[row][col] = replacement;

              expect(
                game.checkWinner(board),
                `replacement: ${replacement}`,
              ).toBeNull();
            }
          },
        );
      });
    });

    it("detects a horizontal X winner", () => {
      const board: Board = [
        ["X", "X", "X", "X"],
        ["O", null, "O", null],
        [null, "O", null, null],
        [null, null, null, null],
      ];

      expect(game.checkWinner(board)).toBe("X");
    });

    it("detects a horizontal O winner", () => {
      const board: Board = [
        ["X", null, "X", null],
        ["O", "O", "O", "O"],
        [null, "X", null, null],
        [null, null, null, null],
      ];

      expect(game.checkWinner(board)).toBe("O");
    });

    it("detects X winning in each row", () => {
      for (let row = 0; row < 4; row++) {
        const board: Board = [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ];

        board[row] = ["X", "X", "X", "X"];

        expect(game.checkWinner(board)).toBe("X");
      }
    });

    it("detects O winning in each row", () => {
      for (let row = 0; row < 4; row++) {
        const board: Board = [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ];

        board[row] = ["O", "O", "O", "O"];

        expect(game.checkWinner(board)).toBe("O");
      }
    });

    it("detects X winning in each column", () => {
      for (let col = 0; col < 4; col++) {
        const board: Board = [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ];

        for (let row = 0; row < 4; row++) {
          board[row][col] = "X";
        }

        expect(game.checkWinner(board)).toBe("X");
      }
    });

    it("detects O winning in each column", () => {
      for (let col = 0; col < 4; col++) {
        const board: Board = [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ];

        for (let row = 0; row < 4; row++) {
          board[row][col] = "O";
        }

        expect(game.checkWinner(board)).toBe("O");
      }
    });

    it("detects a left-to-right diagonal winner", () => {
      const board: Board = [
        ["X", null, null, null],
        [null, "X", null, null],
        [null, null, "X", null],
        [null, null, null, "X"],
      ];

      expect(game.checkWinner(board)).toBe("X");
    });

    it("detects a right-to-left diagonal winner", () => {
      const board: Board = [
        [null, null, null, "O"],
        [null, null, "O", null],
        [null, "O", null, null],
        ["O", null, null, null],
      ];

      expect(game.checkWinner(board)).toBe("O");
    });

    it("detects a four-corner X winner", () => {
      const board: Board = [
        ["X", null, null, "X"],
        [null, "O", null, null],
        [null, null, "O", null],
        ["X", null, null, "X"],
      ];

      expect(game.checkWinner(board)).toBe("X");
    });

    it("detects a four-corner O winner", () => {
      const board: Board = [
        ["O", null, null, "O"],
        [null, "X", null, null],
        [null, null, "X", null],
        ["O", null, null, "O"],
      ];

      expect(game.checkWinner(board)).toBe("O");
    });

    it("detects a 2x2 X winner", () => {
      const board: Board = [
        [null, null, null, null],
        [null, "X", "X", null],
        [null, "X", "X", null],
        [null, null, null, null],
      ];

      expect(game.checkWinner(board)).toBe("X");
    });

    it("detects a 2x2 O winner at the bottom right", () => {
      const board: Board = [
        ["X", null, null, null],
        [null, null, null, null],
        [null, null, "O", "O"],
        [null, null, "O", "O"],
      ];

      expect(game.checkWinner(board)).toBe("O");
    });

    it("returns null for an all-empty board", () => {
      const board: Board = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ];

      expect(game.checkWinner(board)).toBeNull();
    });

    it("returns null for three matching cells plus one empty", () => {
      const board: Board = [
        ["X", "X", "X", null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ];

      expect(game.checkWinner(board)).toBeNull();
    });

    it("returns null for three matching cells plus the opposing player", () => {
      const board: Board = [
        ["O", "O", "O", "X"],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ];

      expect(game.checkWinner(board)).toBeNull();
    });

    it("returns null when there is no winner", () => {
      const board: Board = [
        ["X", "O", "X", "O"],
        ["O", "X", "O", "X"],
        ["X", "O", null, "X"],
        ["X", "X", "O", "O"],
      ];

      expect(game.checkWinner(board)).toBeNull();
    });

    it("throws for malformed board dimensions", () => {
      const board = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ] as unknown as Board;

      expect(() => game.checkWinner(board)).toThrow(
        "Board must be exactly 4x4.",
      );
    });

    it("throws when the number of otherwise correctly sized rows is wrong", () => {
      const board = emptyBoard();
      board.pop();

      expect(() => game.checkWinner(board)).toThrow(
        "Board must be exactly 4x4.",
      );
    });

    it.each([0, 1, 2, 3])("throws when row %i has the wrong length", (row) => {
      const board = emptyBoard();
      board[row].pop();

      expect(() => game.checkWinner(board)).toThrow(
        "Board must be exactly 4x4.",
      );
    });
  });

  describe("isGameOver", () => {
    it("returns true when there is a winner", () => {
      const board: Board = [
        ["X", "X", "X", "X"],
        ["O", null, "O", null],
        [null, "O", null, null],
        [null, null, null, null],
      ];

      expect(game.isGameOver(board)).toBe(true);
    });

    it("returns true for a full board without a winner", () => {
      const board: Board = [
        ["X", "O", "X", "O"],
        ["O", "X", "O", "X"],
        ["X", "O", "O", "X"],
        ["X", "X", "O", "O"],
      ];

      expect(game.checkWinner(board)).toBeNull();
      expect(game.anyMovesLeft(board)).toBe(false);
      expect(game.isGameOver(board)).toBe(true);
    });

    it("returns false when there is no winner and moves remain", () => {
      const board: Board = [
        ["X", "O", null, null],
        ["O", "X", null, null],
        [null, null, null, null],
        [null, null, null, null],
      ];

      expect(game.isGameOver(board)).toBe(false);
    });

    it("returns false for an all-empty board", () => {
      expect(game.isGameOver(emptyBoard())).toBe(false);
    });
  });

  it.each(["checkWinner", "anyMovesLeft", "isGameOver"] as const)(
    "%s does not mutate its input",
    (method) => {
      const board: Board = [
        ["X", "O", "X", "O"],
        ["O", "X", "O", "X"],
        ["X", "O", null, "X"],
        ["X", "X", "O", "O"],
      ];
      const original = structuredClone(board);

      game[method](board);

      expect(board).toEqual(original);
    },
  );
});
