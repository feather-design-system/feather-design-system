import { describe, it } from "mocha";
import { expect } from "chai";

import { create } from "./pages/Demo.js";

describe("Feather Input", () => {
  it("should update value when a new value is input", async () => {
    const page = await create();
    await page.setInputValue("Something");
    expect(await page.getDisplay()).to.eq("Something");
  });
  it("should truncate value when a new value over the size limit is input", async () => {
    const page = await create();
    await page.setInputValue("SomethingVeryLong");
    expect(await page.getDisplay()).to.eq("SomethingV");
  });
  it("should clear value", async () => {
    const page = await create();
    await page.setInputValue("Something");
    const value = await page.clearInputValue();
    expect(value).to.equal("");
  });
});
