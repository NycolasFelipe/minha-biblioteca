/**
 * Retorna uma cor da lista de cores, ciclicamente.
 *
 * Esta função recebe um índice e uma lista de cores. Ela retorna a cor
 * correspondente ao índice, considerando o tamanho da lista de cores.
 * Se o índice for maior que o tamanho da lista, a função retorna a cor
 * correspondente ao resto da divisão do índice pelo tamanho da lista.
 *
 * @param {number} index - O índice da cor a ser retornada.
 * @param {string[]} colors - A lista de cores disponíveis.
 *
 * @throws {Error} Se a lista de cores for vazia ou não for um array.
 *
 * @returns {string} A cor correspondente ao índice.
 */
function cycleColors(index, colors) {
  if (!Array.isArray(colors) || colors.length === 0) {
    throw new Error('colors must be a non-empty array');
  }

  return colors[index % colors.length];
}

export default cycleColors;