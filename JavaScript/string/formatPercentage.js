/**
 * Função auxiliar para formatar um valor decimal no formato de porcentagem com 1 casa decimal.
 *
 * @param {number} value - O número decimal que será convertido em porcentagem.
 * @returns {string} - Uma string representando o valor no formato de porcentagem com uma casa decimal.
 *
 * @example
 * // Exemplos de uso:
 * formatPercentage(0.15451715715); // Retorna "15,5%"
 * formatPercentage(0.12345); // Retorna "12,3%"
 * formatPercentage(1); // Retorna "100,0%"
 */
function formatPercentage(value) {
  if (typeof value !== "number") {
    return value;
  }

  const percentage = (value * 100).toFixed(1).replace('.', ',');
  return `${percentage}%`;
}

export default formatPercentage;
