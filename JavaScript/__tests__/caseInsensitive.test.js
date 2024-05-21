const caseInsensitive = require("../caseInsensitive.js");

describe("Case Insensitive", () => {
  it("Compara se input é equivalente ao termo procurado, independente do case", () => {
    expect(caseInsensitive("door", "door")).toBe(true);
    expect(caseInsensitive("Door", "door")).toBe(true);
    expect(caseInsensitive("DOOR", "door")).toBe(true);
    expect(caseInsensitive("DOOR ", "door")).toBe(true);
    expect(caseInsensitive("DOOR", "door")).toBe(true);
  });
});