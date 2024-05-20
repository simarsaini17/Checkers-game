import { useCallback } from "react";
import { PieceProps } from "./Pieces/Piece";
import { RestartGameButton } from "./Button/RestartGameButton";
import { winnerType } from "./Board";

interface ModalProps {
  winner: winnerType | null;
  resetGame: () => void;
}

export const Modal = ({ winner, resetGame }: ModalProps) => {
  return (
    <div className="fixed z-50 bg-slate-500 w-80 shadow-md h-80 w-3/6 flex flex-col items-center justify-center rounded-md border-slate-900 gap-4 shadow-white">
      <p className="text-amber-500 text-2xl">{winner?.winnerText}</p>
      <RestartGameButton resetGame={resetGame} />
    </div>
  );
};
