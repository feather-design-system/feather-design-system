const page = require("../pages/featherDialog.page");
const expect = require("chai").expect;
describe("feather-dialog", () => {
  it("should open", () => {
    page.open();
    page.openModal();
    expect(page.dialogDisplayed()).to.equal(true);
  });
  it("should close when X is clicked", () => {
    page.open();
    page.openModal();
    page.clickClose();
    expect(page.dialogDisplayed()).to.equal(false);
  });
});
