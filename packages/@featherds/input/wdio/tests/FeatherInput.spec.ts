import { expect } from "chai";
import { create } from "./pages/Demo";
describe("Feather Input", () => {
  it("should update value when a new value is input", async () => {
    const page = await create();
    const value = await page.setInputValue("Something");
    expect(await page.getDisplay()).to.eq(value);
  });
  it("should clear value", async () => {
    const page = await create();
    await page.setInputValue("Something");
    const value = await page.clearInputValue();
    expect(value).to.equal("");
  });
});
