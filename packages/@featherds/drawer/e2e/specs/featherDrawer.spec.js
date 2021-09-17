const expect = require("chai").expect;
const Demo = require("../pages/Demo");
const Left = require("../pages/Left");

describe("Feather Drawer", () => {
  it("should open", () => {
    const page = Demo.create();
    page.openDrawer();
    expect(page.drawerDisplayed()).to.equal(true);
    page.closeDrawer();
    expect(page.drawerDisplayed()).to.equal(false);
  });
  it("should open left drawer", () => {
    const page = Left.create();
    page.openDrawer();
    expect(page.drawerDisplayed()).to.equal(true);
    page.closeDrawer();
    expect(page.drawerDisplayed()).to.equal(false);
  });
});
