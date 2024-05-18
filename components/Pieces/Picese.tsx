export type PieceProps = {
  id: string;
  odd: boolean;
  position: { x: number; y: number };
  disabled?: boolean;
  children: React.ReactNode;
};

export const Piece = ({
  id,
  odd,
  position,
  disabled,
  children,
}: PieceProps) => {
  const pieceColor = odd ? "bg-black" : "bg-red-400";

  return <div className={`${pieceColor} w-16 h-16 rounded-full`}></div>;
};
