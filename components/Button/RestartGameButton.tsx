interface RestartGameButtonProps {
  resetGame: () => void;
}

export const RestartGameButton = ({ resetGame }: RestartGameButtonProps) => {
  return (
    <button className="restart" id="reset" onClick={resetGame}>
      Start a new Game
    </button>
  );
};
