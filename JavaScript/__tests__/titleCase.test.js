const titleCase = require("../titleCase.js");

describe("Title case", () => {
  it("Capitalizar string", () => {
    expect(titleCase("a")).toBe("A");
    expect(titleCase("title")).toBe("Title");
    expect(titleCase("tITLE")).toBe("Title");
    expect(titleCase("Title")).toBe("Title");
    expect(titleCase("title header")).toBe("Title Header");
  })
});