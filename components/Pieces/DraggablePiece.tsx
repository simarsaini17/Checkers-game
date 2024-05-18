import { useDraggable } from "@dnd-kit/core";
import { Piece, PieceProps } from "./Piece";

export const DraggablePiece = (props: PieceProps) => {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <Piece
      ref={setNodeRef}
      {...props}
      {...attributes}
      {...listeners}
      isDragging={isDragging}
    />
  );
};
