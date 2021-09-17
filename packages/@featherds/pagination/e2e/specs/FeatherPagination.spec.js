const expect = require("chai").expect;
const Demo = require("../pages/Demo");
describe("Feather Pagination", () => {
  it("should update page when next is clicked", () => {
    const page = Demo.create();
    const initial = page.getCurretPage();
    page.clickNext();
    expect(page.getCurretPage()).to.equal(initial + 1);
  });
  it("should update page when previous is clicked", () => {
    const page = Demo.create();
    const initial = page.getCurretPage();
    page.clickNext();
    page.clickPrevious();
    expect(page.getCurretPage()).to.equal(initial);
  });

  it("should update page when first is clicked", () => {
    const page = Demo.create();
    page.clickNext();
    page.clickNext();
    page.clickFirst();
    expect(page.getCurretPage()).to.equal(1);
  });
  it("should update page when first is clicked", () => {
    const page = Demo.create();
    page.clickLast();
    expect(page.getCurretPage()).to.equal(10); //assuming defaults
  });
});
