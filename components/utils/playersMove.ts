import { PieceProps } from "../Pieces/Piece";

export const checkValidMove = (
  isFirstPlayerTurn: boolean,
  isFirstPlayerPiece: boolean,
  movingPiece: PieceProps,
  pieces: PieceProps[][],
  moveX: number,
  moveY: number
) => {
  const movingPiecePosition = movingPiece.position;
  const isKing = movingPiece.king;

  // Check valid positions to move
  if (movingPiecePosition) {
    const { x: moveFromX, y: moveFromY } = movingPiecePosition;
    const direction = isFirstPlayerTurn ? 1 : -1;

    const moves = [
      { x: moveFromX + direction, y: moveFromY - 1 },
      { x: moveFromX + direction, y: moveFromY + 1 },
    ];
    const captures = [
      { x: moveFromX + 2 * direction, y: moveFromY - 2 },
      { x: moveFromX + 2 * direction, y: moveFromY + 2 },
    ];

    if (isKing) {
      moves.push(
        { x: moveFromX - direction, y: moveFromY - 1 },
        { x: moveFromX - direction, y: moveFromY + 1 }
      );
      captures.push(
        { x: moveFromX - 2 * direction, y: moveFromY - 2 },
        { x: moveFromX - 2 * direction, y: moveFromY + 2 }
      );
    }

    // Check regular moves
    for (let move of moves) {
      if (moveX === move.x && moveY === move.y && !pieces[move.x]?.[move.y]) {
        return { canMove: true };
      }
    }

    for (let capture of captures) {
      const midX = (moveFromX + capture.x) / 2;
      const midY = (moveFromY + capture.y) / 2;
      const midPiece = pieces[midX]?.[midY];
      if (
        moveX === capture.x &&
        moveY === capture.y &&
        midPiece &&
        midPiece.odd !== isFirstPlayerPiece &&
        !pieces[capture.x]?.[capture.y]
      ) {
        return { canMove: true, canRemove: true, midX, midY };
      }
    }
  }
  return { canMove: false };
};
