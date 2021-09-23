const expect = require("chai").expect;
const Demo = require("../pages/Demo");
const Single = require("../pages/Single");
describe("Feather Autocomplete", () => {
  describe("multi", () => {
    it("should select a value when clicked", async () => {
      const page = await Demo.create();
      await page.selectItem(1);
      expect(await page.getChipCount()).to.eq(2);
      await page.removeChip(1);
      expect(await page.getChipCount()).to.eq(1);
    });
  });
  describe("single", () => {
    it("should select a value when clicked", async () => {
      const page = await Single.create();
      await page.selectItem(0);
      let val = await page.getAutocompleteValue();
      expect(val.length).to.be.greaterThan(0);
      await page.clearAutocomplete();
      val = await page.getAutocompleteValue();
      expect(val.length).to.eq(0);
    });
  });
});
