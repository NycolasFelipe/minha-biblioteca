import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta dados para uma planilha Excel e aciona o download.
 * @function
 * - Essa função recebe um array de objetos, um objeto definindo o mapeamento de colunas e um nome de arquivo opcional
 * - Exporta os dados para uma planilha Excel.
 * @param {Array<object>} arrayTabela - Um array de objetos de dados a serem exportados.
 * @param {object} objectColumns - Um objeto definindo como as propriedades dos objetos devem ser mapeadas para as colunas da planilha. Cada chave representa o nome da coluna, e o valor pode ser:
 *   - O nome da propriedade do objeto de dados a ser usada diretamente.
 *   - Uma função que recebe um objeto de dados como argumento e retorna o valor a ser colocado na coluna.
 * @param {string} [filename='tabela.xlsx'] - O nome do arquivo da planilha Excel a ser baixado (padrão: "tabela.xlsx").

 * @example
 * ```javascript
 * const data = [
 *   { id: 1, name: 'John Doe', age: 30 },
 *   { id: 2, name: 'Jane Smith', age: 25 },
 * ];
 * const columns = {
 *   'ID': 'id',
 *   'Name': 'name',
 *   'Age': (item) => item.age + 1, // Add 1 to age
 * };
 * exportToExcel(data, columns, 'my_data.xlsx');
 * ```
 */
function exportToExcel(arrayTabela, objectColumns, filename = 'tabela.xlsx') {
  const formattedData = arrayTabela.map((item) => {
    const formattedItem = {};
    Object.entries(objectColumns).forEach(([key, value]) => {
      formattedItem[key] = typeof value === 'function' ? value(item) : item[value];
    });
    return formattedItem;
  });

  const worksheet = utils.json_to_sheet(formattedData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Dados');
  const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), filename);
};

export default exportToExcel;