const expect = require("chai").expect;
const Demo = require("../pages/Demo");
describe("Feather Input", () => {
  it("should update value when a new value is input", async () => {
    const page = await Demo.create();
    const value = await page.setInputValue("Something");
    expect(await page.getDisplay()).to.eq(value);
  });
});
