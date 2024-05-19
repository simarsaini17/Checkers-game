interface TurnProps {
  isFirstPlayerTurn: boolean;
}
export const Turn = ({ isFirstPlayerTurn }: TurnProps): JSX.Element => {
  return (
    <div className="flex gap-2 items-center font-serif">
      <div
        className={`w-10 h-10 ${
          isFirstPlayerTurn
            ? "bg-black border-slate-700"
            : "bg-red-300 border-gray-300"
        } rounded-full border-4 `}
      />
      <p className="text-amber-500">
        {isFirstPlayerTurn ? "Black Turn" : "Pink Turn"}
      </p>
    </div>
  );
};
