interface RestartGameButtonProps {
  resetGame: () => void;
}

export const RestartGameButton = ({ resetGame }: RestartGameButtonProps) => {
  return (
    <button
      data-testid="reset-game"
      className="restart"
      id="reset"
      onClick={resetGame}
    >
      Start a new Game
    </button>
  );
};
