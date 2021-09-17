const expect = require("chai").expect;
const Demo = require("../pages/Demo");
const Single = require("../pages/Single");
describe("Feather Autocomplete", () => {
  describe("multi", () => {
    it("should select a value when clicked", () => {
      const page = Demo.create();
      page.selectItem(1);
      expect(page.getChipCount()).to.eq(2);
      page.removeChip(1);
      expect(page.getChipCount()).to.eq(1);
    });
  });
  describe("single", () => {
    it("should select a value when clicked", () => {
      const page = Single.create();
      page.selectItem(0);
      expect(page.getAutocompleteValue().length).to.be.greaterThan(0);
      page.clearAutocomplete();
      expect(page.getAutocompleteValue().length).to.eq(0);
    });
  });
});
