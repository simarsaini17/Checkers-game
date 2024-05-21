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
      <p data-testid="player-turn" className="text-amber-500">
        {isFirstPlayerTurn ? "Black's Turn" : "Pink's Turn"}
      </p>
    </div>
  );
};
