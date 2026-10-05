import { describe, expect, it } from "vitest";
import { TicTacToe, type Board } from "../src/TicTacToe.js";

describe("TicTacToe", () => {
  const game = new TicTacToe();

  describe("anyMovesLeft", () => {
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

    it("returns null when there is no horizontal or vertical winner", () => {
      const board: Board = [
        ["X", "O", "X", "O"],
        ["O", "X", "O", "X"],
        ["X", "O", null, "O"],
        ["O", "X", "O", "X"],
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
  });
});
