/**
 * Realiza uma requisição GET
 * 
 * @param {Object} params - Parâmetros da requisição.
 * @param {string} params.url - URL da API.
 * @returns {Promise<Object>} Retorna os dados ou um objeto de erro.
 */
async function fetchData({ url }) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = `Erro: ${response.status} - ${response.statusText}`;
      console.error(errorMessage);
      return { error: true, message: errorMessage };
    }

    return await response.json();
  } catch (err) {
    console.error("Erro ao se conectar ao servidor:", err);
    return { error: true, message: "Erro ao se conectar ao servidor." };
  }
}

export default fetchData;