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
  const { setNodeRef } = useDroppable({ id: id });

  return (
    <div
      ref={setNodeRef}
      className={`${
        odd ? "bg-amber-700" : "bg-amber-200"
      } md:w-20 md:h-20 flex justify-center items-center ${
        validMove && "border-green-600 border-4"
      } w-10 h-10`}
      data-x={x}
      data-y={y}
    >
      {children}
    </div>
  );
};
