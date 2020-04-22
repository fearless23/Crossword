const keyboardMoves = (grid, cols) => {
  function checkLeftIdx(start) {
    if (start === 0) return start;
    const newIdx = start - 1;
    if (grid[newIdx] === ".") return checkLeftIdx(newIdx);
    else return newIdx;
  }

  function checkRightIdx(start) {
    if (start === grid.length - 1) return start;
    const newIdx = start + 1;
    if (grid[newIdx] === ".") return checkRightIdx(newIdx);
    else return newIdx;
  }

  function checkBottomIdx(start) {
    if (start === grid.length) return start;
    const newIdx = start + cols;
    if (grid[newIdx] === ".") return checkBottomIdx(newIdx);
    else if (grid[newIdx] === undefined) return start;
    else return newIdx;
  }

  function checkTopIdx(start) {
    if (start === 0) return start;
    const newIdx = start - cols;
    if (grid[newIdx] === ".") return checkTopIdx(newIdx);
    else if (grid[newIdx] === undefined) return start;
    else return newIdx;
  }

  return {
    top: checkTopIdx,
    left: checkLeftIdx,
    right: checkRightIdx,
    bottom: checkBottomIdx,
  };
};

const getLRTB = (keyCode) => {
  if (keyCode === 37) return "left";

  if (keyCode === 38) return "top";

  if (keyCode === 39) return "right";

  if (keyCode === 40) return "bottom";
};

export { keyboardMoves, getLRTB };
