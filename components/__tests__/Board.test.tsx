import { generateBoard, generateBoardPieces } from "../utils/board";
import { Board } from "../Board";
import { render, screen, fireEvent } from "@testing-library/react";
import { PieceProps } from "../Pieces/Piece";
import { checkValidMove } from "../utils/playersMove";

let pieces: PieceProps[][];

describe("Board Component", () => {
  beforeEach(() => {
    pieces = generateBoardPieces(generateBoard());
  });

  render(<Board />);

  test("is Board dispyed on the screen", () => {
    const boardElement = screen.getByTestId("game-board");
    expect(boardElement).toBeInTheDocument();
  });

  test("isValidMove identifies a valid move for a regular piece", () => {
    const movingPiece = pieces[2][3] as PieceProps;
    const validMove = checkValidMove(true, true, movingPiece, pieces, 3, 2);
    expect(validMove.canMove).toBe(true);
    expect(validMove.canRemove).toBeFalsy();
  });

  test("isValidMove identifies a valid capture move for a regular piece", () => {
    pieces[3][2] = {
      id: "piece1",
      odd: false,
      king: false,
      position: { x: 3, y: 2 },
    };
    const movingPiece = pieces[2][1] as PieceProps;
    const validMove = checkValidMove(true, true, movingPiece, pieces, 4, 3);
    expect(validMove.canMove).toBe(true);
    expect(validMove.canRemove).toBe(true);
    expect(validMove.midX).toBe(3);
    expect(validMove.midY).toBe(2);
  });
});
