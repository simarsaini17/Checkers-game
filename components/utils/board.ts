interface PlayBoard {
  id: string;
  x: number;
  y: number;
  odd: boolean;
}

const BOARD_SIZE = 8;

export const generateBoard = () => {
  let odd = false;
  const board: PlayBoard[][] = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE)
  );

  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (y % BOARD_SIZE !== 0) {
        odd = !odd;
      }
      board[x][y] = { id: `${x}-${y}`, x, y, odd };
    }
  }
  return board;
};

export const generateBoardPieces = (board: PlayBoard[][]) => {
  const pieces = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE));
  const piecesRow = [0, 1, 2, BOARD_SIZE - 3, BOARD_SIZE - 2, BOARD_SIZE - 1];

  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      const boardCell = board[x][y];
      if (boardCell.odd && piecesRow.includes(x)) {
        const odd = x <= BOARD_SIZE / 2;
        pieces[x][y] = {
          odd,
          id: `${x}-${y}`,
          position: { x, y },
          disabled: false,
        };
      }
    }
  }

  return pieces;
};
