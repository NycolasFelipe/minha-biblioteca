/**
 * Realiza uma requisição POST, PUT ou DELETE
 * 
 * @param {Object} params - Parâmetros da requisição.
 * @param {string} params.url - URL da API.
 * @param {string} params.method - Método HTTP (POST, PUT, DELETE).
 * @param {Object} [params.body] - Corpo da requisição.
 * @returns {Promise<Object>} Retorna os dados ou um objeto de erro.
 */
async function sendData({ url, method, body = {} }) {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

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

export default sendData;