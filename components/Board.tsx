import { useCallback, useState } from "react";
import { generateBoard, generateBoardPieces } from "./utils/board";
import { BoardConatiner } from "./BoardConatiner";
import { Cell } from "./Cell";
import { Piece, PieceProps } from "./Pieces/Picese";
import { DndContext } from "@dnd-kit/core";

export const Board = () => {
  const [board] = useState(generateBoard());
  const [movingPiece, setMovingPiece] = useState(true);
  const [pieces, setBoardPieces] = useState(() => generateBoardPieces(board));
  const [isfirstPlayerTurn, setFirstPlayerTurn] = useState(true);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);

  const isValidMove = useCallback(
    (
      isfirstPlayerTurn: boolean,
      isFirstPlayerPiece: boolean,
      movingPiece: PieceProps,
      moveX: number,
      moveY: number
    ) => {},
    []
  );

  const movePiece = useCallback(
    (
      moveX: number,
      moveY: number,
      movingPiece: PieceProps,
      movingPieceX: number,
      movingPieceY: number
    ) => {
      const findPiece = {
        id: `${moveX}-${moveY}`,
        position: { x: moveX, y: moveY },
        odd: movingPiece.odd,
        disabled: false,
      };

      const newPosition = [(pieces[moveX][moveY] = findPiece)];

      const clearOriginalPosition = [
        (pieces[movingPieceX][movingPieceY] = undefined),
      ];

      const updatedPiecesPosition = [
        ...pieces,
        newPosition,
        clearOriginalPosition,
      ];
      return updatedPiecesPosition;
    },
    [pieces]
  );

  const dragPiece = () => {};

  const dragFinished = () => {};

  const cancelDragPiece = () => {};

  return (
    <DndContext
      id="gameBoard"
      onDragStart={dragPiece}
      onDragEnd={dragFinished}
      onDragCancel={cancelDragPiece}
    >
      <BoardConatiner>
        {board.map((eachRow, x) => {
          return eachRow.map((eachCol, y) => {
            const piece = pieces[x][y];
            return (
              <Cell key={eachCol.id} validMove={true} {...eachCol}>
                {piece && <Piece {...piece} />}
              </Cell>
            );
          });
        })}
      </BoardConatiner>
    </DndContext>
  );
};
