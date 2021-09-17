const expect = require("chai").expect;
const Demo = require("../pages/Demo");
describe("Feather Select", () => {
  it("should select a value when clicked", () => {
    const page = Demo.create();
    const result = page.selectItem(1);
    expect(page.getValue()).to.eq(result);
  });
});
