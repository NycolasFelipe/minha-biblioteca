import convertBRLStringToFloat from "./convertBRLStringToFloat";
/**
 * Função para ordenar uma tabela de forma simplificada.
 * @function
 * - Esta função é desenhada para ser utilizada em um contexto de renderização de tabelas,
 * onde o estado da tabela é gerenciado por um mecanismo de estado (como o React).
 * - Ela identifica a coluna a ser ordenada, determina a direção da ordenação e atualiza o estado
 * com os dados ordenados.
 *
 * **Importante:** Esta função assume que a estrutura dos dados da tabela e a forma como a tabela é renderizada
 * estão configuradas de acordo com suas convenções.
 *
 * @param {Event} e - O evento de clique que aciona a ordenação.
 * @param {Object} customHeaders - Um objeto que mapeia os nomes das colunas exibidas na tabela
 *                                  para os nomes das propriedades correspondentes nos objetos de dados.
 * @param {Array} state - O array de objetos que representa os dados da tabela.
 * @param {Function} setState - A função para atualizar o estado da aplicação com os dados ordenados.
 * @returns {void}
 */


function sortTableLite(e, customHeaders, state, setState) {
  // Obtém o nome da coluna selecionada
  const sortValueName = e.target.parentNode.parentNode.firstChild.innerText;

  // Encontra a chave correspondente ao nome da coluna no objeto customHeaders
  const sortValue = Object.values(customHeaders).filter(value => value === sortValueName).join("");
  const sortKey = Object.keys(customHeaders).find(key => customHeaders[key] === sortValue);

  // Verifica se a coluna possui um valor válido para ordenação
  if (sortValue.length > 0) {
    // Determina a direção da ordenação (ascendente ou descendente)
    const asc = e.target.innerText === "▼";

    // Cria uma cópia do array de dados filtrados para realizar a ordenação
    const sorted = state.slice().sort((a, b) => {
      // Ordenação especial para valores monetários no formato BRL
      if (sortKey.includes("$")) {
        const key = sortKey.replace("$", "");
        const floatA = convertBRLStringToFloat(a[key]);
        const floatB = convertBRLStringToFloat(b[key]);
        return asc ? floatA - floatB : floatB - floatA;

      } else if (sortKey.includes("%")) {
        const key = sortKey.replace("%", "");
        const splitDateA = a[key]?.split("/");
        const splitDateB = b[key]?.split("/");

        if (splitDateA && splitDateB) {
          const yearA = splitDateA[2];
          const monthA = splitDateA[1];
          const dayA = splitDateA[0];

          const yearB = splitDateB[2];
          const monthB = splitDateB[1];
          const dayB = splitDateB[0];

          const dateA = new Date(yearA, monthA, dayA).getTime();
          const dateB = new Date(yearB, monthB, dayB).getTime();

          return asc ? dateA - dateB : dateB - dateA;
        }

      // Ordenação padrão para outros tipos de dados
      } else {
        const valueA = a[sortKey];
        const valueB = b[sortKey];
        return asc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    });

    // Atualiza o estado com os dados ordenados
    setState(sorted);
  }
}

export default sortTableLite;