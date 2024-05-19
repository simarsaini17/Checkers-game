interface ScoreBoardProps {
  firstPlayerScore: number;
  secondPlayerScore: number;
}

export const ScoreBoard = ({
  firstPlayerScore,
  secondPlayerScore,
}: ScoreBoardProps) => {
  return (
    <div className="w-1/4 h-1/4 basis-28 grid grid-cols-2 border-slate-950 border-8 border-double rounded-md font-serif text-lg bg-stone-800">
      <div className="flex justify-start flex-col items-center border-r-4 border-slate-950">
        <div className="max-w-full text-amber-500 ">Black Score</div>
        <div className="grow text-white text-4xl">{firstPlayerScore}</div>
      </div>
      <div className="flex justify-start flex-col items-center">
        <div className="max-w-full text-amber-500">Pink Score</div>
        <div className="grow text-white text-4xl">{secondPlayerScore}</div>
      </div>
    </div>
  );
};
