import { useCallback, useState } from "react";
import { generateBoard, generateBoardPieces } from "./utils/board";
import { BoardConatiner } from "./BoardConatiner";
import { Cell } from "./Cell";
import Piece, { PieceProps } from "./Pieces/Picese";
import { DndContext, DragStartEvent } from "@dnd-kit/core";

export const Board = () => {
  const [board] = useState(generateBoard());
  const [movingPiece, setMovingPiece] = useState<PieceProps | null>(null);
  const [pieces, setBoardPieces] = useState(() => generateBoardPieces(board));
  const [isFirstPlayerTurn, setFirstPlayerTurn] = useState(true);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [winner, setWinner] = useState(undefined);

  const isValidMove = useCallback(
    (
      isFirstPlayerTurn: boolean,
      isFirstPlayerPiece: boolean,
      movingPiece: PieceProps,
      moveX: number,
      moveY: number
    ) => {
      const movingPiecePosition = movingPiece.position;
      const { x: moveFromX, y: moveFromY } = movingPiecePosition;

      if (isFirstPlayerTurn && isFirstPlayerPiece && movingPiecePosition) {
        if (moveFromX - 1 >= 0 && moveFromX <= 6) {
          const piece = pieces[moveFromX + 1][moveFromY - 1];
          if (piece && !piece.odd) {
            const placesToGo = pieces[moveFromX + 2][moveFromY - 2];
            if (
              placesToGo === undefined &&
              moveX === moveFromX + 2 &&
              moveY === moveFromY - 2
            ) {
              return { canMove: true, canRemove: true, isLeft: true };
            }

            if (!piece && moveX === moveFromX + 1 && moveY === moveFromY - 1) {
              return { canMove: true };
            }
          }
        }

        if (moveFromY + 1 <= 7 && moveFromX <= 6) {
          const piece = pieces[moveFromX + 1][moveFromY + 1];

          if (piece && !piece.odd) {
            const placesToGo = pieces[moveFromX + 2][moveFromY + 2];
            if (
              placesToGo === undefined &&
              moveX === moveFromX + 2 &&
              moveY === moveFromY + 2
            ) {
              return { canMove: true, canRemove: true, isRight: true };
            }

            if (
              piece === undefined &&
              moveX === moveFromX + 1 &&
              moveY === moveFromY + 1
            ) {
              return { canMove: true };
            }
          }
        }
      } else if (
        !isFirstPlayerTurn &&
        !isFirstPlayerPiece &&
        movingPiecePosition
      ) {
        if (moveFromX - 1 >= 0) {
          const piece = pieces[moveFromX - 1][moveFromY - 1];
          if (piece && piece.odd && moveFromX - 2 >= 0) {
            const placesToGo = pieces[moveFromX - 2][moveFromY - 2];
            if (
              placesToGo === undefined &&
              moveX === moveFromX - 2 &&
              moveY === moveFromY - 2
            ) {
              return { canMove: true, canRemove: true, isLeft: true };
            }

            if (!piece && moveX === moveFromX - 1 && moveY === moveFromY - 1) {
              return { canMove: true };
            }
          }
        }
        if (moveFromY + 1 <= 7 && moveFromX - 1 >= 0) {
          const piece = pieces[moveFromX - 1][moveFromY - 1];
          if (piece && piece.odd && moveFromX - 2 >= 0) {
            const placesToGo = pieces[moveFromX - 2][moveFromY + 2];
            if (
              placesToGo === undefined &&
              moveX === moveFromX - 2 &&
              moveFromY - 2
            ) {
              return { canMove: true, canRemove: true, isRight: true };
            }

            if (!piece && moveX === moveFromX - 1 && moveY === moveFromY + 1) {
              return { canMove: true };
            }
          }
        }
      }
    },
    [pieces]
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

  const dragPiece = ({ active }: DragStartEvent) => {
    const piece = pieces.reduce<PieceProps | undefined>((acc, row) => {
      return acc ?? row.find((cell) => cell.id === active.id);
    }, undefined);

    if (piece) {
      setMovingPiece(piece);
    }
  };

  const dragFinished = () => {};

  const cancelDragPiece = () => {
    setMovingPiece(null);
  };

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
