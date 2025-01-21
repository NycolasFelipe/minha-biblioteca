/**
 * Importa dados de um determinado intervalo de células do Google Sheets e mapeia em um objeto com base nas colunas fornecidas.
 * @function
 * - Esta função usa a API do Google Sheets para buscar dados de um intervalo de células específicas da planilha.
 * - Em seguida, percorre as linhas e cria objetos, mapeando cada coluna em uma chave com base no mapeamento fornecido.
 * @async
 * @param {string} apiKey - Sua chave da API do Google Sheets
 * @param {string} spreadsheetId - O id da planilha que contém os dados
 * @param {string} range - O intervalo de células para importar(por exemplo, "Sheet1!A1:C10")
 * @param {Object.<string, number>} mappedColumns - Um objeto mapeando as chaves das colunas para o índice correspondente da coluna no intervalo (baseado em zero).
 * @returns {Promise<Array<Object>>} Uma promessa que resolve para um array de objetos, onde cada objeto contém dados de uma linha mapeados de acordo com as colunas fornecidas..
 * @throws {Error} - Caso ocorra um erro ao buscar os dados da API do Google Sheets.
 */
const importFromSheets = async (apiKey, spreadsheetId, range, mappedColumns) => {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`);
    const data = await response.json();

    const fetchedData = data.values?.slice(1).map((row) => {
      const rowData = {};
      Object.entries(mappedColumns).forEach(([key, columnIndex]) => {
        rowData[key] = row[columnIndex];
      });
      return rowData;
    });

    return fetchedData;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

export default importFromSheets;
