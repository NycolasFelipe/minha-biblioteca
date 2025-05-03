// Divide uma string uma vez no separador especificado e retorna a parte inicial e o restante.
// Parâmetros:
// - s: String original a ser dividida
// - on: Separador (valor padrão: " ")
// Retorna: Um array com duas posições [primeiraParte, restante]
//          Se o separador não for encontrado, a segunda posição será null
function splitOnce(s, on = " ") {
  // Divide a string em todas as ocorrências do separador
  const [first, ...rest] = s.split(on);

  // Junta as partes restantes e verifica se há conteúdo
  // Retorna null na segunda posição se não houver restante
  return [first, rest.length > 0 ? rest.join(on) : null];
}

export default splitOnce;