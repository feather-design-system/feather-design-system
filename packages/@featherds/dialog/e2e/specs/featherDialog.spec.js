const page = require("../pages/featherDialog.page");
const expect = require("chai").expect;
describe("feather-dialog", () => {
  it("should open", async () => {
    await page.open();
    await page.openModal();
    expect(await page.dialogDisplayed()).to.equal(true);
  });
  it("should close when X is clicked", async () => {
    await page.open();
    await page.openModal();
    await page.clickClose();
    expect(await page.dialogDisplayed()).to.equal(false);
  });
});
