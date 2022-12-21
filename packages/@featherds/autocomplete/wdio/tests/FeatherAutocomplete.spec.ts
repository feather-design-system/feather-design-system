import { expect } from "chai";
import { create as createSingle } from "./pages/Single";
import { create as createMulti } from "./pages/Demo";
describe("Feather Autocomplete", () => {
  describe("single", () => {
    it("should select a value by index", async () => {
      const page = await createSingle();
      await page.selectByIndex(0);
      const val = await page.getValue();
      expect(val.length).to.be.greaterThan(0);
    });
    it("should select a value by text", async () => {
      const page = await createSingle();
      await page.selectByText("Liam");
      const val = await page.getValue();
      expect(val.length).to.be.greaterThan(0);
    });
    it("should clear a value", async () => {
      const page = await createSingle();
      await page.selectByIndex(0);
      let val = await page.getValue();
      expect(val.length).to.be.greaterThan(0);
      await page.clearValue();
      val = await page.getValue();
      expect(val.length).to.eq(0);
    });
  });

  describe("multi", () => {
    it("should select a value by index", async () => {
      const page = await createMulti();
      await page.selectByIndex(0);
      const val = await page.getValue();
      expect(val.length).to.be.greaterThan(0);
    });
    it("should select a value by text", async () => {
      const page = await createMulti();
      const item = "Liam";
      await page.selectByText(item);
      const val = await page.getValue();
      expect(val.length).to.be.greaterThan(0);
      expect(val[0]).to.equal(item);
    });
    it("should select multi values", async () => {
      const page = await createMulti();
      await page.selectByText("Liam");
      await page.selectByText("Emma");
      const val = await page.getValue();
      expect(val.length).to.equal(2);
    });

    it("should clear a value", async () => {
      const page = await createMulti();
      await page.selectByText("Liam");
      await page.selectByText("Emma");
      await page.clearChip("Liam");
      const val = await page.getValue();
      expect(val.length).to.equal(1);
    });
  });
});
