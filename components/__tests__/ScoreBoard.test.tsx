import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ScoreBoard } from "../ScoreBoard";

describe("Score Board Component", () => {
  const firstPlayerScore = 10;
  const secondPlayerScore = 20;
  beforeEach(() => {
    render(
      <ScoreBoard
        firstPlayerScore={firstPlayerScore}
        secondPlayerScore={secondPlayerScore}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Score board displays correctly", () => {
    const blackScoreTitle = screen.getByText("Black Score");
    const pinkScoreTitle = screen.getByText("Pink Score");
    expect(blackScoreTitle).toBeInTheDocument();
    expect(pinkScoreTitle).toBeInTheDocument();
  });
});
