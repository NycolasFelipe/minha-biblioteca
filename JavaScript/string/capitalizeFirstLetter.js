/**
 * Converte a primeira letra de uma string para maiúscula e mantém o restante inalterado.
 * @function
 * @param {string} str String para ser convertida.
 * @returns {string} A string com a primeira letra em maiúscula e o restante inalterado. 
 * 
 * @example
 * const primeiraLetraMaiúscula = capitalizeFirstLetter("isso é um texto");
 * console.log(primeiraLetraMaiúscula); // Output: "Isso é um texto"
 */
function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default capitalizeFirstLetter;