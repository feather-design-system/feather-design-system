import { expect } from "chai";
import { create } from "./pages/Demo";
describe("Feather Select", () => {
  it("should select a value by index", async () => {
    const page = await create();
    const result = await page.selectByIndex(1);
    expect(await page.getValue()).to.eq(result);
  });

  it("should select a value by text", async () => {
    const page = await create();
    const result = await page.selectByText("Massachusetts");
    expect(await page.getValue()).to.eq(result);
  });
});
