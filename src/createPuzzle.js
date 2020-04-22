import { createBox } from "./createBox";

const styleGrid = (size, boxDims) => {
  const { cols, rows } = size;
  const gameGrid = document.getElementById("game");
  gameGrid.style.width = `${cols * boxDims.width}px`;
  gameGrid.style.height = `${rows * boxDims.height}px`;
  gameGrid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${rows},1fr)`;
  return gameGrid;
};

const createPuzzle = (grid, gridnums, size, boxDims, fn) => {
  const game = styleGrid(size, boxDims);
  for (let i = 0; i < grid.length; i++) {
    const box = createBox(i, gridnums[i], grid[i], fn);
    game.appendChild(box);
  }
  return game;
};

export { createPuzzle };
