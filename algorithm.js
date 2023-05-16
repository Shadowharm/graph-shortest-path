function floydAlgorithm(matrix, size) {
  const result = [...matrix]
  let path = [...matrix.map(arr => arr.map(() => null))]
  
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (x === y) {
        path[x][y] = 0;
    }
    else if (matrix[x][y] !== Infinity) {
        path[x][y] = x;
    }
    else {
        path[x][y] = -1;
    }
    }
  }
  for (let i = 0; i < size; i++) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (i !== x && i !== y && x !== y) {
          if (result[i][y] + result[x][i] < result[x][y]) {
            result[x][y] = result[i][y] + result[x][i]
            path[x][y] = path[i][y]
          }
        }
      }
    }
  }
  return {result, path};
}
