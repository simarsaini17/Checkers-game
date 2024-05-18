import { useDroppable } from "@dnd-kit/core";
interface EachCellProps {
  children?: React.ReactNode;
  id: string;
  odd: boolean;
  validMove: boolean;
  x: number;
  y: number;
}

export const Cell = ({ id, odd, validMove, x, y, children }: EachCellProps) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div className={`${odd ? "bg-amber-700" : "bg-amber-200"} w-20 h-20`}>
      {children}
    </div>
  );
};
