const expect = require("chai").expect;
const Demo = require("../pages/Demo");
describe("Feather Select", () => {
  it("should select a value when clicked", async () => {
    const page = await Demo.create();
    const result = await page.selectItem(1);
    expect(await page.getValue()).to.eq(result);
  });
});
