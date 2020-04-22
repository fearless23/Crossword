const createNumSpan = (numVal) => {
  const numSpan = document.createElement("span");
  numSpan.classList.add("number");
  numSpan.innerText = numVal === 0 ? "" : numVal;
  return numSpan;
};

const createLetterSpan = (letter) => {
  const letterSpan = document.createElement("span");
  letterSpan.classList.add("letter");
  const letterShown = Math.random() > 0.75;
  letterSpan.innerText = letterShown ? letter : "";
  return { letterSpan, letterShown };
};

const createBox = (idx, gridNum, letter, fn) => {
  const boxDiv = document.createElement("div");
  boxDiv.classList.add("box");
  if (letter === ".") {
    boxDiv.classList.add("empty");
    return boxDiv;
  }
  boxDiv.setAttribute("data-idx", idx);

  const numSpan = createNumSpan(gridNum);
  boxDiv.appendChild(numSpan);

  const { letterSpan, letterShown } = createLetterSpan(letter);
  boxDiv.appendChild(letterSpan);

  if (!letterShown) {
    boxDiv.addEventListener("click", () => {
      boxDiv.classList.add("active");
      fn(idx, boxDiv);
    });
  } else {
    boxDiv.classList.add("fixed");
  }
  return boxDiv;
};

export { createBox };
