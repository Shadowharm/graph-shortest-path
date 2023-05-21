const verticesNumbersInput = document.getElementById("vertices");
const graphInputsBlock = document.getElementById("graph-inputs");
const mainBlock = document.getElementById("main-block");
const floydBtn = document.getElementById("floyd-btn");
const dijkstraBtn = document.getElementById("dijkstra-btn");
const resultBlock = document.getElementById("result");
let graphInputs;
let verticesNumbers = 3;

verticesNumbersInput.value = verticesNumbers;

let matrix;

const matrixInputEvent = (i, j) => {
  return (e) => {
    const value = +e.target.value;
    if (!value || value < 0) {
      if (!value) {
        updateMatrix(i, j, "");
        // updateMatrix(j, i, Infinity);
      }
      return;
    }
    updateMatrix(i, j, value);
    // updateMatrix(j, i, value);
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
      }%"><input type="text" value="${
        i === j ? "X" : ""
      }" placeholder="∞" class="form-control form-control-sm matrix text-center" id="input-${i}-${j}"></div>`;
    }
  }
  graphInputsBlock.innerHTML = str;

  matrix = Array.from({ length: verticesNumbers }, (_, i) =>
    Array.from({ length: verticesNumbers }, (_, j) =>
      i === j ? "X" : Infinity
    )
  );
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
    graphInputs[`input-${i}-${j}`].value =
      matrix[i][j] === Infinity ? "" : matrix[i][j];
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

dijkstraBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let str = `<h3>Результат по методу Дейкстры</h3>`;

  //* paths
  str += `<div class="accordion mt-5">`;

  for (let i = 0; i < verticesNumbers; i++) {
    str += `<div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="false" aria-controls="collapse-${i}">
        Пути из вершины ${i + 1}
      </button>
    </h2>
    <div id="collapse-${i}" class="accordion-collapse collapse">
      <div class="accordion-body">`;

    const { weight, paths } = dijkstraAlgorithm(verticesNumbers, i, matrix);

    for (let j = 0; j < verticesNumbers; j++) {
      if (i !== j && weight[j] === Infinity) {
        str += `<p>Пути из вершины ${i + 1} —> ${j + 1} нет`;
      }
      if (i !== j && weight[j] !== Infinity) {
        str += `<p>Путь из вершины ${i + 1} —> ${j + 1} имеет длину ${
          weight[j]
        }: ${paths[j].map((number) => number + 1).join(" —> ")}</p>`;
      }
    }
    str += `</div>
      </div>
    </div>`;
  }

  str += `</div>`;

  resultBlock.innerHTML = str;
  resultBlock.scrollIntoView({ behavior: "smooth" });
});

const buildPath = (path, i, j, route) => {
  if (path[i][j] === i) {
    return;
  }
  buildPath(path, i, path[i][j], route);
  route.push(path[i][j]);
};

floydBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const { result, path } = floydAlgorithm(
    matrix.map(function (item) {
      return [...item];
    }),
    verticesNumbers
  );
  //* matrix
  let str = `<h3>Результат по методу Флойда</h3>
  <div class="d-flex flex-wrap brackets result" style="width: ${
    (verticesNumbers / 12) * 100
  }%">`;
  for (let i = 0; i < verticesNumbers; i++) {
    for (let j = 0; j < verticesNumbers; j++) {
      str += `<div style="flex: 0 0 auto; text-align: center; width: ${
        (1 / verticesNumbers) * 100
      }%">${result[i][j] === Infinity ? "∞" : result[i][j]}</div>`;
    }
  }
  str += `</div>`;

  //* paths
  str += `<div class="accordion mt-5">`;

  for (let i = 0; i < verticesNumbers; i++) {
    str += `<div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="false" aria-controls="collapse-${i}">
        Пути из вершины ${i + 1}
      </button>
    </h2>
    <div id="collapse-${i}" class="accordion-collapse collapse">
      <div class="accordion-body">`;

    for (let j = 0; j < verticesNumbers; j++) {
      if (i !== j && path[i][j] === -1) {
        str += `<p>Пути из вершины ${i + 1} —> ${j + 1} нет`;
      }
      if (i !== j && path[i][j] !== -1) {
        const route = [i];
        buildPath(path, i, j, route);
        route.push(j);
        str += `<p>Путь из вершины ${i + 1} —> ${j + 1} имеет длину ${
          result[i][j]
        }: ${route.map((number) => number + 1).join(" —> ")}</p>`;
      }
    }
    str += `</div>
      </div>
    </div>`;
  }

  str += `</div>`;

  resultBlock.innerHTML = str;
  resultBlock.scrollIntoView({ behavior: "smooth" });
});
