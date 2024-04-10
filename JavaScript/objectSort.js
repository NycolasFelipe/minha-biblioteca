export default function ordenar(lista, chave) {
  const resultado = lista.sort((a, b) => {
    if (a[chave] < b[chave]) {
      return -1;
    }
    if (a[chave] > b[chave]) {
      return 1;
    }
    return 0;
  });

  return resultado;
}