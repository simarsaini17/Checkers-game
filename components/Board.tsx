import { useCallback, useState } from "react";
import { generateBoard, generateBoardPieces } from "./utils/board";
import { BoardConatiner } from "./BoardConatiner";
import { Cell } from "./Cell";
import { Piece, PieceProps } from "./Pieces/Piece";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { DraggablePiece } from "./Pieces/DraggablePiece";
import { ScoreBoard } from "./ScoreBoard";

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
      // Check valid positions piece move positions for first player
      const movingPiecePosition = movingPiece.position;

      if (isFirstPlayerTurn && isFirstPlayerPiece && movingPiecePosition) {
        const { x: moveFromX, y: moveFromY } = movingPiecePosition;

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
          }
          if (!piece && moveX === moveFromX + 1 && moveY === moveFromY - 1) {
            return { canMove: true };
          }
        }

        // check valid move at right

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
          }

          if (
            piece === undefined &&
            moveX === moveFromX + 1 &&
            moveY === moveFromY + 1
          ) {
            return { canMove: true };
          }
        }

        if (moveFromX === 0) {
          let piece = pieces[moveFromX + 1][moveFromY - 1];

          if (piece && !piece.odd) {
            const placesToGo = pieces[moveFromX + 2][moveFromY - 2];

            if (
              placesToGo === undefined &&
              moveX === moveFromX + 2 &&
              moveY === moveFromY - 2
            ) {
              return { canMove: true, canRemove: true, isLeft: true };
            }
          }

          if (!piece && moveX === moveFromX + 1 && moveY === moveFromY - 1) {
            return { canMove: true };
          }
        }
      }
      // check valid move for second player
      else if (
        !isFirstPlayerTurn &&
        !isFirstPlayerPiece &&
        movingPiecePosition
      ) {
        const { x: moveFromX, y: moveFromY } = movingPiecePosition;

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
          }

          if (!piece && moveX === moveFromX - 1 && moveY === moveFromY - 1) {
            return { canMove: true };
          }
        }

        if (moveFromY + 1 <= 7 && moveFromX - 1 >= 0) {
          const piece = pieces[moveFromX - 1][moveFromY + 1];

          if (piece && piece.odd && moveFromX - 2 >= 0) {
            const placesToGo = pieces[moveFromX - 2][moveFromY + 2];
            if (
              placesToGo === undefined &&
              moveX === moveFromX - 2 &&
              moveY === moveFromY + 2
            ) {
              return { canMove: true, canRemove: true, isRight: true };
            }
          }

          if (!piece && moveX === moveFromX - 1 && moveY === moveFromY + 1) {
            return { canMove: true };
          }
        }
      }
      return { canMove: false };
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
        odd: movingPiece.odd,
        position: { x: moveX, y: moveY },
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

      // clear unused positions
      updatedPiecesPosition.splice(8, 2);

      return updatedPiecesPosition;
    },
    [pieces]
  );

  // find the moving piece from  list of pieces and if piece is found
  // then set the current moving piece to the active dragging piece

  const handleDragPieceStart = ({ active }: DragStartEvent) => {
    // get the active piece from the list of pieces
    const piece = pieces.reduce<PieceProps | undefined>((acc, row) => {
      return acc ?? row.find((cell) => cell?.id === active.id);
    }, undefined);

    if (piece) {
      setMovingPiece(piece);
    }
  };

  const handleDragFinished = useCallback(
    (event: DragEndEvent) => {
      if (!movingPiece?.position || !event.over?.id) {
        return;
      }

      const { x: movingPieceX, y: movingPieceY } = movingPiece.position;
      const [moveToX, moveToY] = event.over.id
        .toString()
        .split("-")
        .map(Number);

      const { canMove, canRemove, isRight } = isValidMove(
        isFirstPlayerTurn,
        movingPiece.odd,
        movingPiece,
        moveToX,
        moveToY
      );

      if (canMove && !canRemove) {
        if (pieces[moveToX][moveToY]) {
          return;
        }

        const newPieces = movePiece(
          moveToX,
          moveToY,
          movingPiece,
          movingPieceX,
          movingPieceY
        );

        setFirstPlayerTurn(!isFirstPlayerTurn);

        setBoardPieces(newPieces);
      }

      if (canMove && canRemove) {
        let grabEnemy: undefined[] = [];

        if (movingPiece.odd) {
          if (isRight) {
            grabEnemy = [
              (pieces[movingPieceX + 1][movingPieceY + 1] = undefined),
            ];
          } else {
            grabEnemy = [
              (pieces[movingPieceX + 1][movingPieceY - 1] = undefined),
            ];
          }
          setFirstPlayerScore(firstPlayerScore + 1);
        }

        if (!movingPiece.odd) {
          if (isRight) {
            grabEnemy = [
              (pieces[movingPieceX - 1][movingPieceY + 1] = undefined),
            ];
          } else {
            grabEnemy = [
              (pieces[movingPieceX - 1][movingPieceY - 1] = undefined),
            ];
          }
          setSecondPlayerScore(secondPlayerScore + 1);
        }

        const newPieces = movePiece(
          moveToX,
          moveToY,
          movingPiece,
          movingPieceX,
          movingPieceY
        );

        setBoardPieces([...newPieces, grabEnemy]);
        setFirstPlayerTurn(!isFirstPlayerTurn);
      }
      setMovingPiece(null);
    },
    [
      isValidMove,
      isFirstPlayerTurn,
      firstPlayerScore,
      movePiece,
      secondPlayerScore,
      movingPiece,
      pieces,
    ]
  );

  const handleCancelDrag = () => {
    setMovingPiece(null);
  };

  return (
    <DndContext
      id="board"
      onDragStart={handleDragPieceStart}
      onDragEnd={handleDragFinished}
      onDragCancel={handleCancelDrag}
    >
      <ScoreBoard
        firstPlayerScore={firstPlayerScore}
        secondPlayerScore={secondPlayerScore}
      />
      <BoardConatiner>
        {board.map((eachRow, x) => {
          return eachRow.map((eachCol, y) => {
            const piece = pieces[x][y];
            const disabled =
              (piece?.odd && !isFirstPlayerTurn) ||
              (!piece?.odd && isFirstPlayerTurn);

            if (!piece) {
              const canDropPiece = movingPiece
                ? isValidMove(
                    isFirstPlayerTurn,
                    movingPiece.odd,
                    movingPiece,
                    x,
                    y
                  ).canMove
                : false;
              return (
                <Cell key={eachCol.id} validMove={canDropPiece} {...eachCol} />
              );
            }

            const pieceMarkup = disabled ? (
              <Piece {...piece} disabled />
            ) : (
              <DraggablePiece {...piece} />
            );

            return (
              <Cell key={eachCol.id} {...eachCol}>
                {pieceMarkup}
              </Cell>
            );
          });
        })}
      </BoardConatiner>
      <DragOverlay dropAnimation={null}>
        {movingPiece === null ? null : (
          <Piece odd={movingPiece?.odd} clone id={movingPiece.id} />
        )}
      </DragOverlay>
    </DndContext>
  );
};
