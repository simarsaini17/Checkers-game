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
import { Turn } from "./Turn";
import { RestartGameButton } from "./Button/RestartGameButton";
import { WinnerModal } from "./WinnerModal";
import { checkValidMove } from "./utils/playersMove";

export type winnerType = {
  isWinner: boolean;
  winnerText: string;
};

export const Board = (): JSX.Element => {
  const [board, setGameBoard] = useState(generateBoard());
  const [movingPiece, setMovingPiece] = useState<PieceProps | null>(null);
  const [pieces, setBoardPieces] = useState(() => generateBoardPieces(board));
  const [isFirstPlayerTurn, setFirstPlayerTurn] = useState(true);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [winner, setWinner] = useState<winnerType | null>(null);

  const isValidMove = useCallback(
    (
      isFirstPlayerTurn: boolean,
      isFirstPlayerPiece: boolean,
      movingPiece: PieceProps,
      moveX: number,
      moveY: number
    ) => {
      return checkValidMove(
        isFirstPlayerTurn,
        isFirstPlayerPiece,
        movingPiece,
        pieces,
        moveX,
        moveY
      );
    },
    [pieces]
  );

  const movePiece = useCallback(
    (
      moveX: number,
      moveY: number,
      movingPiece: PieceProps,
      movingPieceX: number,
      movingPieceY: number,
      king = false
    ) => {
      const findPiece: PieceProps = {
        id: `${moveX}-${moveY}`,
        odd: movingPiece.odd,
        position: { x: moveX, y: moveY },
        disabled: false,
        king: king || movingPiece.king,
      };
      const newPosition = [(pieces[moveX][moveY] = findPiece)];
      const cleanOriginalPosition = [
        (pieces[movingPieceX][movingPieceY] = undefined),
      ];

      const updatedPieces = [...pieces, newPosition, cleanOriginalPosition];

      // clear unused positions
      updatedPieces.splice(8, 2);
      return updatedPieces;
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

  const checkWinner = useCallback(
    (pieces: PieceProps[][]) => {
      const firstPlayerPieces = pieces
        .flat()
        .filter((piece: PieceProps) => piece && piece?.odd);
      const secondPlayerPieces = pieces
        .flat()
        .filter((piece: PieceProps) => piece && !piece.odd);

      if (firstPlayerPieces.length === 0) {
        return setWinner({ isWinner: true, winnerText: "Pink Wins" });
      } else if (secondPlayerPieces.length === 0) {
        return setWinner({ isWinner: true, winnerText: "Black Wins" });
      }
    },
    [setWinner]
  );

  const handleDragFinished = useCallback(
    (event: DragEndEvent) => {
      if (!movingPiece?.position || !event.over?.id) return;

      const { x: movingPieceX, y: movingPieceY } = movingPiece.position;
      const [moveToX, moveToY] = event.over.id
        .toString()
        .split("-")
        .map(Number);

      const { canMove, canRemove, midX, midY } = isValidMove(
        isFirstPlayerTurn,
        movingPiece.odd,
        movingPiece,
        moveToX,
        moveToY
      );

      if (canMove) {
        let newPieces = movePiece(
          moveToX,
          moveToY,
          movingPiece,
          movingPieceX,
          movingPieceY,
          moveToX === (movingPiece.odd ? 7 : 0)
        );

        if (canRemove && midX !== undefined && midY !== undefined) {
          newPieces[midX][midY] = undefined;
          if (movingPiece.odd) {
            setFirstPlayerScore(firstPlayerScore + 1);
          } else {
            setSecondPlayerScore(secondPlayerScore + 1);
          }

          const possibleMoreJump = [
            isValidMove(
              isFirstPlayerTurn,
              movingPiece.odd,
              { ...movingPiece, position: { x: moveToX, y: moveToY } },
              moveToX + 2,
              moveToY + 2
            ),
            isValidMove(
              isFirstPlayerTurn,
              movingPiece.odd,
              { ...movingPiece, position: { x: moveToX, y: moveToY } },
              moveToX + 2,
              moveToY - 2
            ),
            isValidMove(
              isFirstPlayerTurn,
              movingPiece.odd,
              { ...movingPiece, position: { x: moveToX, y: moveToY } },
              moveToX - 2,
              moveToY + 2
            ),
            isValidMove(
              isFirstPlayerTurn,
              movingPiece.odd,
              { ...movingPiece, position: { x: moveToX, y: moveToY } },
              moveToX - 2,
              moveToY - 2
            ),
          ].find((jump) => jump.canMove && jump.canRemove);

          if (possibleMoreJump?.canMove && possibleMoreJump?.canRemove) {
            setMovingPiece({
              ...movingPiece,
              position: { x: moveToX, y: moveToY },
            });

            setBoardPieces(newPieces);
            return;
          }
        }

        setFirstPlayerTurn(!isFirstPlayerTurn);
        setBoardPieces(newPieces);
        checkWinner(newPieces);
      }

      setMovingPiece(null);
    },
    [
      movingPiece,
      isValidMove,
      isFirstPlayerTurn,
      movePiece,
      checkWinner,
      firstPlayerScore,
      secondPlayerScore,
    ]
  );

  const handleCancelDrag = () => {
    setMovingPiece(null);
  };

  const resetGame = () => {
    setGameBoard(generateBoard());
    setBoardPieces(() => generateBoardPieces(board));
    setFirstPlayerScore(0);
    setSecondPlayerScore(0);
    setFirstPlayerTurn(true);
    setMovingPiece(null);
    setWinner(null);
  };

  return (
    <DndContext
      id="board"
      onDragStart={handleDragPieceStart}
      onDragEnd={handleDragFinished}
      onDragCancel={handleCancelDrag}
    >
      {winner?.isWinner && (
        <div className="fixed w-full h-full bg-black/[0.6]"></div>
      )}
      <Turn isFirstPlayerTurn={isFirstPlayerTurn} />
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

            return (
              <Cell key={eachCol.id} {...eachCol}>
                {disabled ? (
                  <Piece {...piece} disabled />
                ) : (
                  <DraggablePiece {...piece} />
                )}
              </Cell>
            );
          });
        })}
      </BoardConatiner>
      <DragOverlay dropAnimation={null}>
        {movingPiece === null ? null : (
          <Piece
            odd={movingPiece.odd}
            clone
            king={movingPiece.king}
            id={movingPiece.id}
          />
        )}
      </DragOverlay>

      <RestartGameButton resetGame={resetGame} />
      {winner?.isWinner && (
        <WinnerModal winner={winner} resetGame={resetGame} />
      )}
    </DndContext>
  );
};
