const expect = require("chai").expect;
const Demo = require("../pages/Demo");
describe("Feather Pagination", () => {
  it("should update page when next is clicked", async () => {
    const page = await Demo.create();
    const initial = await page.getCurretPage();
    await page.clickNext();
    expect(await page.getCurretPage()).to.equal(initial + 1);
  });
  it("should update page when previous is clicked", async () => {
    const page = await Demo.create();
    const initial = await page.getCurretPage();
    await page.clickNext();
    await page.clickPrevious();
    expect(await page.getCurretPage()).to.equal(initial);
  });

  it("should update page when first is clicked", async () => {
    const page = await Demo.create();
    await page.clickNext();
    await page.clickNext();
    await page.clickFirst();
    expect(await page.getCurretPage()).to.equal(1);
  });
  it("should update page when first is clicked", async () => {
    const page = await Demo.create();
    await page.clickLast();
    expect(await page.getCurretPage()).to.equal(10); //assuming defaults
  });
});
