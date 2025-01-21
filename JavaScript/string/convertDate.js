/**
 * Converte uma string de data no formato ISO 8601 para uma string no formato DD/MM/AAAA.
 * @function
 * 
 * - Essa função recebe uma string de data no formato ISO 8601("2023-11-22T10:30:00Z")
 * - Converte em uma string no formato DD/MM/AAAA (por exemplo, "22/11/2023").

 * @param {string} isoDate A string de data no formato ISO 8601 a ser convertida. 
 * @returns {string} A string formatada no formato DD/MM/AAAA.

 * @example
 * ```javascript
 * const isoDate = "2023-11-22T10:30:00Z";
 * const formattedDate = convertDate(isoDate);
 * console.log(formattedDate); // Output: 22/11/2023
 * ```
 */
function convertDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default convertDate;