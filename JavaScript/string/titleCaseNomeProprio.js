/**
 * Capitaliza um nome de forma apropriada, garantindo que palavras menores, como "da", "de", "do", etc.,
 * permaneçam em minúsculas, exceto quando forem a primeira palavra do nome.
 *
 * @param {string} name O nome que será capitalizado.
 * @returns {string} O nome capitalizado de forma correta.
 *
 * @example
 * titleCaseNomeProprio("JOÃO DA SILVA DOS SANTOS");
 * // Retorna: "João da Silva dos Santos"
 *
 * @example
 * titleCaseNomeProprio("joão da silva de santos");
 * // Retorna: "João da Silva de Santos"
 */
function titleCaseNomeProprio(name) {
  const lowerCaseWords = [
    "da", "de", "do", "das", "dos", "e"
  ];

  return name
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      // Capitaliza sempre a primeira palavra
      if (index === 0 || !lowerCaseWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word; // Mantém palavras menores em letras minúsculas
    })
    .join(" ");
}

export default titleCaseNomeProprio;