/**
 * Converte uma string de data para um formato mais legível em português.
 *
 * @param {string} string - A string representando a data a ser convertida.
 * @param {boolean} [d=true] - Indica se o dia deve ser incluído na string formatada.
 * @param {boolean} [m=true] - Indica se o mês (por extenso) deve ser incluído na string formatada.
 * @param {boolean} [y=true] - Indica se o ano deve ser incluído na string formatada.
 * @returns {string} - A string da data formatada, por exemplo, "15 de janeiro de 2024".
 *
 * @example
 * const dataFormatada = convertDateToString('2024-01-15');
 * console.log(dataFormatada); // Saída: "15 de janeiro de 2024"
 */

function convertDateToString({ string, d = true, m = true, y = true }) {
  // Cria um objeto Date a partir da string
  const data = new Date(string);

  // Obtém as partes da data em um formato utilizável
  const dia = data.getDate();
  const mes = data.getMonth() + 1; // Meses começam em 0
  const ano = data.getFullYear();

  // Array com os nomes dos meses em português
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  // Formata a data na string desejada
  return [d && dia, m && meses[mes - 1], y && ano].filter(Boolean).join(" de ");
}

export default convertDateToString;