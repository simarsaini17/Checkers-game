import { useDroppable } from "@dnd-kit/core";
interface EachCellProps {
  children?: React.ReactNode;
  id: string;
  odd: boolean;
  validMove?: boolean | undefined;
  x: number;
  y: number;
}

export const Cell = ({
  id,
  odd,
  validMove = false,
  x,
  y,
  children,
}: EachCellProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: id });

  return (
    <div
      ref={setNodeRef}
      className={`${
        odd ? "bg-amber-700" : "bg-amber-200"
      } w-20 h-20 flex justify-center items-center ${
        validMove === true ? "border-green-600 border-4" : ""
      }`}
      data-x={x}
      data-y={y}
    >
      {children}
    </div>
  );
};
