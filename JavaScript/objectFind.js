export default function encontrar(lista, chave, valor) {
  return lista.find((item) => item[chave].includes(valor));
}
