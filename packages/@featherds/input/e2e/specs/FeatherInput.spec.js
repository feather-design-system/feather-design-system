const expect = require("chai").expect;
const Demo = require("../pages/Demo");
describe("Feather Input", () => {
  it("should update value when a new value is input", () => {
    const page = Demo.create();
    const value = page.setInputValue("Something");
    expect(page.getDisplay()).to.eq(value);
  });
});
