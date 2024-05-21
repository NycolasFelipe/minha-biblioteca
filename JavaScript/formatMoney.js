function formatMoney(number) {
  if (Number.isNaN(number)) {
    return console.log("Provided value is not a number.");
  }
  return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

module.exports = formatMoney;