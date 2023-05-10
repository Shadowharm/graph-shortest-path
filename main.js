const verticesNumbersInput = document.getElementById("vertices");
const graphInputsBlock = document.getElementById("graph-inputs");
const mainBlock = document.getElementById("main-block");
const floydBtn = document.getElementById("floyd-btn");
let graphInputs;
let verticesNumbers = 3;

verticesNumbersInput.value = verticesNumbers

let matrix;

const matrixInputEvent = (i, j) => {
  return (e) => {
    const value = +e.target.value;
    if (!value || value < 0) {
      if (!value) {
        updateMatrix(i, j, Infinity);
        updateMatrix(j, i, Infinity);
      }
      return;
    }
    updateMatrix(i, j, value);
    updateMatrix(j, i, value);
  };
};

const matrixBlurEvent = (i, j) => {
  return (e) => {
    updateMatrix(i, j);
    updateMatrix(j, i);
  };
};

const insertMatrix = () => {
  let str = ``;
  for (let i = 0; i < verticesNumbers; i++) {
    for (let j = 0; j < verticesNumbers; j++) {
      str += `<div style="flex: 0 0 auto; width: ${
        (1 / verticesNumbers) * 100
      }%"><input type="text" value="${i === j ? 'X' : ''}" placeholder="∞" class="form-control form-control-sm matrix text-center" id="input-${i}-${j}"></div>`;
    }
  }
  graphInputsBlock.innerHTML = str;

  matrix = Array.from({ length: verticesNumbers }, (_, i) =>
    Array.from({ length: verticesNumbers }, (_, j) => i === j ? 'X' : Infinity)
  );
  // matrix = [
  //   ['X', 1, null, null, null, 2, null, 3,],
  //   [null, 'X', null, null, null, null, null, null],
  //   [null, null, 'X', null, null, null, null, null,]
  //   [null, null, null, 'X', null, null, null, null],
  //   [null, null, null, null, 'X', null, null, null,]
  //   [null, null, null, null, null, 'X', null, null],
  //   [null, null, null, null, null, null, 'X', null,]
  //   [null, null, null, null, null, null, null, 'X'],
  // ]

  graphInputs = document.getElementsByClassName("matrix");
  for (let i = 0; i < verticesNumbers; i++) {
    for (let j = 0; j < verticesNumbers; j++) {
      graphInputs[`input-${i}-${j}`].addEventListener(
        "input",
        matrixInputEvent(i, j)
      );
      graphInputs[`input-${i}-${j}`].addEventListener(
        "blur",
        matrixBlurEvent(i, j)
      );
    }
  }
};
insertMatrix();

const updateMatrix = (i, j, value = undefined) => {
  if (value === undefined || i === j) {
    graphInputs[`input-${i}-${j}`].value = matrix[i][j] === Infinity ? "" : matrix[i][j];
    return;
  }
  graphInputs[`input-${i}-${j}`].value = value;
  matrix[i][j] = value ? value : Infinity;
};

verticesNumbersInput.addEventListener("input", (e) => {
  const value = +e.target.value;
  if (!value || value <= 1 || value > 12) {
    if (!value) {
      e.target.value = "";
    }
    return;
  }
  verticesNumbers = value;

  insertMatrix();
});
verticesNumbersInput.addEventListener("change", (e) => {
  e.target.value = verticesNumbers;
});

floydBtn.addEventListener("click", (e) => {
  console.log(floydAlgorithm(matrix, verticesNumbers))
})