const expect = require("chai").expect;
const Demo = require("../pages/Demo");
const Left = require("../pages/Left");

describe("Feather Drawer", () => {
  it("should open", async () => {
    const page = await Demo.create();
    await page.openDrawer();
    expect(await page.drawerDisplayed()).to.equal(true);
    await page.closeDrawer();
    expect(await page.drawerDisplayed()).to.equal(false);
  });
  it("should open left drawer", async () => {
    const page = await Left.create();
    await page.openDrawer();
    expect(await page.drawerDisplayed()).to.equal(true);
    await page.closeDrawer();
    expect(await page.drawerDisplayed()).to.equal(false);
  });
});
