function floidAlgorithm (matrix, size) {
    for (let i = 0; i < size; i++) {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (matrix[i][y] && matrix[x][i] && i !== x && i !== y) {
                    if (!matrix[x][y]) {
                        matrix[x][y] = matrix[i][y] + matrix[x][i]
                    } else {
                        matrix[x][y] = Math.min(matrix[i][y] + matrix[x][i], matrix[x][y])
                    }
                }
            }
        }
    }
    console.log(matrix);
}