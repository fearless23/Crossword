import { createPuzzle } from "./createPuzzle";
import { grid, gridnums, clues, size } from "./data.json";
const boxSize = 40;
const boxDims = {
  height: boxSize,
  width: boxSize,
};

import { keyboardMoves, getLRTB } from "./keyboardMoves";
const findNewIdx = keyboardMoves(grid, size.cols);

const { across, down } = clues;
const hints = {
  across: {},
  down: {},
};
across.forEach((hint) => {
  const [n, ...rest] = hint.split(".");
  hints.across[n] = rest.join(".");
});
down.forEach((hint) => {
  const [n, ...rest] = hint.split(".");
  hints.down[n] = rest.join(".");
});

const acrossDiv = document.getElementById("across");
const downDiv = document.getElementById("down");

class StartGame {
  constructor() {
    this.selectedBoxIdx = -1;
    this.selectedBox = null;
    this.init();
  }

  init() {
    this.gameBox = createPuzzle(grid, gridnums, size, boxDims, (idx, boxDiv) =>
      this.boxClicked(idx, boxDiv)
    );
    document.addEventListener("keyup", (e) => {
      if (this.selectedBox) {
        const dir = getLRTB(e.keyCode);
        if (dir) this.ltrbMove(dir, this.selectedBoxIdx);
        else this.otherMoves(e.keyCode, e.key);
      } else {
        console.log("click on a box");
      }
    });
  }

  boxClicked(idx, boxDiv) {
    if (this.selectedBox) {
      this.selectedBox.classList.remove("active");
    }
    this.selectedBoxIdx = idx;
    this.selectedBox = boxDiv;
    this.showHints(idx);
  }

  ltrbMove(dir, start) {
    const newIdx = findNewIdx[dir](start);
    if (newIdx === start) return;
    const newBox = this.gameBox.childNodes[newIdx];
    // Check if selectedBox is fixed...
    const isFixed = newBox.classList.contains("fixed");
    const isEmpty = newBox.classList.contains("empty");
    if (isFixed || isEmpty) {
      return this.ltrbMove(dir, newIdx);
    } else {
      this.selectedBox.classList.remove("active");
      this.selectedBoxIdx = newIdx;
      newBox.classList.add("active");
      this.selectedBox = newBox;
      this.showHints(newIdx);
      return;
    }
  }

  otherMoves(keyCode, key) {
    const letterSpan = this.selectedBox.childNodes[1];
    if (keyCode > 64 && keyCode < 91) {
      letterSpan.innerText = key.toUpperCase();
    }
    if (keyCode === 8 || keyCode === 46) {
      letterSpan.innerText = "";
    }
  }

  showHints(idx) {
    acrossDiv.innerText = "";
    downDiv.innerText = "";
    const n = gridnums[idx];
    if (n !== 0) {
      acrossDiv.innerText = hints.across[n] ? "ACROSS: " + hints.across[n] : "";
      downDiv.innerText = hints.down[n] ? "DOWN: " + hints.down[n] : "";
    }
  }
}

new StartGame();
