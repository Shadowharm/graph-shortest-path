function floydAlgorithm(matrix, size) {
    console.log(matrix);
  const result = JSON.parse(JSON.stringify(matrix));
  console.log(result);
  for (let i = 0; i < size; i++) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (i !== x && i !== y && x !== y) {
          result[x][y] = Math.min(result[i][y] + result[x][i], result[x][y]);
        }
      }
    }
  }
  return result;
}
