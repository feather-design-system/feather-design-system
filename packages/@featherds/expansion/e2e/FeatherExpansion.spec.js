const Demo = require("./Demo.page");
describe("Feather Expansion", () => {
  it("should expand", () => {
    const page = Demo.create();
    page.clickExpansion();
    page.expanded();
  });
});
