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
  { id, odd, disabled, position, isDragging, children, ...rest },
  ref
) {
  return (
    <button
      className={`${
        odd ? "bg-black" : "bg-red-300"
      } w-16 h-16 rounded-full shadow-lg shadow-current cursor-grabbing ${
        isDragging && "opacity-50"
      }`}
      ref={ref as any}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});
