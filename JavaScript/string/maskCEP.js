import filterDigits from "./filterDigits";

/**
 * @module maskCEP
 * @description Formata uma string conforme o padrão de CEP brasileiro (XXXXX-XXX)
 * @param {string} value - Valor de entrada a ser formatado (pode conter caracteres não numéricos)
 * @returns {string} CEP formatado com hífen após o 5º dígito
 * @example
 * // Retorna "12345-678"
 * maskCEP("12345678");
 * @example
 * // Retorna "12345-67"
 * maskCEP("1a2b3c4d5e6f7");
 * @example
 * // Retorna "1234"
 * maskCEP("12$34");
 */
function maskCEP(value) {
  const digits = filterDigits(8, value);
  let maskedCEP = "";

  for (let i = 0; i < digits.length; i++) {
    if (i === 5) {
      maskedCEP += "-";
    }
    maskedCEP += digits[i];
  }

  return maskedCEP;
}

export default maskCEP;