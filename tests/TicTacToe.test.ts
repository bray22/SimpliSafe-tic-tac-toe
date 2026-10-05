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
});
