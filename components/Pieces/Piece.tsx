import { forwardRef } from "react";

export type PieceProps = {
  id: string;
  odd: boolean;
  clone?: boolean;
  position?: { x: number; y: number };
  disabled?: boolean;
  isDragging?: boolean;
  children?: React.ReactNode;
};

export const Piece = forwardRef<HTMLElement, PieceProps>(function Piece(
  { id, odd, clone, disabled, position, isDragging, children, ...rest },
  ref
) {
  return (
    <button
      className={`${
        odd ? "bg-black border-slate-700 " : "bg-red-300 border-gray-300 "
      } w-16 h-16 border-4 rounded-full shadow-lg shadow-current cursor-grabbing ${
        isDragging && "opacity-50"
      } ${disabled && "pointer-events-none"}`}
      ref={ref as any}
      data-x={position?.x}
      data-y={position?.y}
      aria-describedby={id}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});
