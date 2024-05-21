import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Turn } from "../Turn";

describe("Score Board Component", () => {
  beforeEach(() => {
    render(<Turn isFirstPlayerTurn={true} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("display correct player turn", () => {
    const currentPlayer = screen.getByTestId("player-turn");
    expect(currentPlayer).toHaveTextContent("Black's Turn");
    expect(currentPlayer).not.toHaveTextContent("Pink's Turn");
  });
});
