const Demo = require("./Demo.page");
describe("Feather Expansion", () => {
  it("should expand", async () => {
    const page = await Demo.create();
    await page.clickExpansion();
    await page.expanded();
  });
});
