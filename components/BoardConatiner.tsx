interface BoardConatiner {
  children: React.ReactNode;
}

export const BoardConatiner = ({ children }: BoardConatiner) => {
  return (
    <div
      data-testid="game-board"
      className="grid grid-cols-8 content-center shadow-xl border-8 border-orange-50 rounded-xl"
    >
      {children}
    </div>
  );
};
