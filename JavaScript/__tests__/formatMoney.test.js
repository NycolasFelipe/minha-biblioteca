const formatMoney = require("../formatMoney.js");

describe("Format money", () => {
  it("Formatar valor para formato monetário (R$)", () => {
    expect(formatMoney(0.01)).toBe('R$\xa00,01');
    expect(formatMoney(0.1)).toBe('R$\xa00,10');
    expect(formatMoney(0)).toBe('R$\xa00,00');
    expect(formatMoney(1)).toBe('R$\xa01,00');
    expect(formatMoney(10)).toBe('R$\xa010,00');
    expect(formatMoney(100)).toBe('R$\xa0100,00');
    expect(formatMoney(1000)).toBe('R$\xa01.000,00');
    expect(formatMoney(10000)).toBe('R$\xa010.000,00');
    expect(formatMoney(-1)).toBe('-R$\xa01,00');
  });
});