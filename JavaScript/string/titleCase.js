/**
 * Essa função converte uma string para o formato de título.
 * @function
 * @param {string} str String para ser convertida.
 * @returns {string}
 * 
 * @example
 * const titleCasedText = titleCase("isso é um título");
 * console.log(titleCasedText); // Output: "Isso É Um Título"
 */
const titleCase = (str) => {
  if (!(str instanceof String)) {
    return console.log("Provided value is not a string.");
  }
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

export default titleCase;