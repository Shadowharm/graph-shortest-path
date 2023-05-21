function floydAlgorithm(matrix, size) {
  //** Создаем копию матрицы для сохранения промежуточных результатов
  const result = matrix;
  //** Создаем копию матрицы для сохранения информации о пути
  let path = [...matrix.map((arr) => arr.map(() => null))];

  //** заполняем 2D - массив с путями: проставляем индексы исходных вершин
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (x === y) {
        //** Устанавливаем диагональные элементы равными 0, указывая на расстояние до самого себя
        path[x][y] = 0;
      } else if (matrix[x][y] !== Infinity) {
        //** Устанавливаем элементы пути равными начальной вершине
        path[x][y] = x;
      } else {
        //** если нет маршрута из вершины x в yУстанавливаем элементы пути равными -1, указывая на отсутствие прямого пути {
        path[x][y] = -1;
      }
    }
  }
  //* * Выполнение алгоритма Флойда-Уоршелла
  for (let i = 0; i < size; i++) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (i !== x && i !== y && x !== y) {
          if (result[i][y] + result[x][i] < result[x][y]) {
            //** Обновляем матрицу результатов, если найден более короткий путь
            result[x][y] = result[i][y] + result[x][i];
            //** Обновляем матрицу путей с новой информацией о пути
            path[x][y] = path[i][y];
          }
        }
      }
    }
  }
  //** Возвращаем матрицу результатов и матрицу пути
  return { result, path };
}

function dijkstraAlgorithm(size, cur, matrix) {
  const valid = Array.from({ length: size }, () => true);  //* Массив флагов для отслеживания посещенных вершин
  const weight = Array.from({ length: size }, () => Infinity);  //* Массив для хранения текущих весов путей до вершин
  const paths = Array.from({ length: size }, () => []);  //* Массив для хранения путей до каждой вершины

  weight[cur] = 0;  //* Устанавливаем начальный вес текущей вершины равным 0
  paths[cur].push(cur);  //* Добавляем начальную вершину в путь до нее самой

  for (let i = 0; i < size; i++) {
    let minWeight = Infinity;  //* Инициализируем переменную для хранения минимального веса
    let minWeightIdx = -1;  //* Инициализируем переменную для хранения индекса вершины с минимальным весом

    //* Поиск вершины с наименьшим весом среди непосещенных вершин
    for (let j = 0; j < size; j++) {
      if (valid[j] && weight[j] <= minWeight) {
        minWeight = weight[j];
        minWeightIdx = j;
      }
    }

    //* Обновление весов путей к другим вершинам, если возможно
    for (let z = 0; z < size; z++) {
      const newWeight = weight[minWeightIdx] + matrix[minWeightIdx][z];

      if (newWeight <= weight[z]) {
        if (newWeight < weight[z]) {
          weight[z] = newWeight;
          paths[z] = [...paths[minWeightIdx], z];  //* Обновляем путь до вершины с новым весом
        } else {
          paths[z].push(z);  //* Добавляем вершину в путь, если вес равен текущему
        }
      }
    }

    valid[minWeightIdx] = false;  //* Помечаем текущую вершину как посещенную
  }

  return { weight, paths };  //* Возвращаем массивы с весами и путями до вершин
}
