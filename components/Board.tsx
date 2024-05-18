import { useCallback, useState } from "react";
import { generateBoard, generateBoardPieces } from "./utils/board";
import { BoardConatiner } from "./BoardConatiner";
import { Cell } from "./Cell";

export const Board = () => {
  const [board] = useState(generateBoard());
  const [movingPiece, setMovingPiece] = useState(true);
  const [pieces, setBoardPieces] = useState(() => generateBoardPieces(board));
  const [isfirstPlayerTurn, setFirstPlayerTurn] = useState(true);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);

  const movePiece = useCallback(() => {}, []);

  return (
    <BoardConatiner>
      {board.map((eachRow, x) => {
        return eachRow.map((eachCol, y) => {
          const piece = pieces[x][y];

          return <Cell key={eachCol.id} validMove={true} {...eachCol} />;
        });
      })}
    </BoardConatiner>
  );
};
