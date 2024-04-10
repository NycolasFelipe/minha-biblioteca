export default function filtrar(lista, chave, valor) {
  return lista.filter((item) => {
    return item[chave].includes(valor);
  });
}