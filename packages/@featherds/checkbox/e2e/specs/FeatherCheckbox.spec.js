const page = require("../pages/checkbox.page");
const expect = require("chai").expect;

const simple = "/Checkbox-Checkbox";
const indeterminate = "/Checkbox-Indeterminate";

describe("Feather Checkbox", () => {
  it("should check on click if unchecked", () => {
    page.open(simple);
    expect(page.isUnchecked(page.subscribe)).to.equal(true);
    page.subscribe.click();
    expect(page.isChecked(page.subscribe)).to.equal(true);
  });
  it("should uncheck on click if checked", () => {
    page.open(simple);
    page.subscribe.click();
    expect(page.isChecked(page.subscribe)).to.equal(true);
    page.subscribe.click();
    expect(page.isUnchecked(page.subscribe)).to.equal(true);
  });
  it("should have a disabled state", () => {
    page.open(simple);
    page.disable.click();
    expect(page.isChecked(page.disable)).to.equal(true);
    expect(page.isUnchecked(page.subscribe)).to.equal(true);
    page.subscribe.click();
    expect(page.isUnchecked(page.subscribe)).to.equal(true);
    expect(page.isDisabled(page.subscribe)).to.equal(true);
  });
  it("should have an indeterminate state", () => {
    page.open(indeterminate);
    expect(page.isUnchecked(page.parent)).to.equal(true);
    page.child.click();
    expect(page.isChecked(page.child)).to.equal(true);
    expect(page.isChecked(page.parent)).to.equal(false);
    expect(page.isUnchecked(page.parent)).to.equal(false);
    expect(page.isIndeterminate(page.parent)).to.equal(true);
  });
  it("should go to checked state if clicked whilst indeterminate", () => {
    page.open(indeterminate);
    expect(page.isUnchecked(page.parent)).to.equal(true);
    page.child.click();
    expect(page.isIndeterminate(page.parent)).to.equal(true);
    page.parent.click();
    expect(page.isChecked(page.parent)).to.equal(true);
  });
});
