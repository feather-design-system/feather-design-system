import { expect } from "chai";
import { create } from "./pages/Demo";
describe("Feather Select", () => {
  it("should select a value when clicked", async () => {
    const page = await create();
    const result = await page.selectIndex(1);
    expect(await page.getValue()).to.eq(result);
  });
});
